/* eslint-disable */
// @ts-check

// @ts-expect-error - TS doesn't know this import
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
// @ts-expect-error - TS doesn't know this import
import { githubComment } from 'https://raw.githubusercontent.com/dotansimha/k6-github-pr-comment/master/lib.js';
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {},
  thresholds: {},
};

const DURATION = 30;
const VUS = 1;

function getOptionsForScenario(scenario, index) {
  const noErrors = `no_errors{mode:${scenario}}`;
  const expectedResult = `expected_result{mode:${scenario}}`;
  const httpReqDuration = `http_req_duration{mode:${scenario}}`;
  const scenarioField = {
    executor: 'constant-vus',
    exec: 'run',
    startTime: DURATION * index + 's',
    vus: VUS,
    duration: DURATION + 's',
    env: { MODE: scenario },
    tags: { mode: scenario },
  };
  return {
    scenario: scenarioField,
    thresholds: {
      [noErrors]: ['rate>0.99'],
      [expectedResult]: ['rate>0.99'],
      [httpReqDuration]: ['avg<=1'],
    },
  };
}

const scenarioNames = ['no-schema', 'json-schema', 'zod'];

scenarioNames.forEach((name, index) => {
  const { scenario, thresholds } = getOptionsForScenario(name, index);
  options.scenarios[name] = scenario;
  Object.assign(options.thresholds, thresholds);
});

export function handleSummary(data) {
  if (__ENV.GITHUB_TOKEN) {
    githubComment(data, {
      token: __ENV.GITHUB_TOKEN,
      commit: __ENV.GITHUB_SHA,
      pr: __ENV.GITHUB_PR,
      org: 'ardatan',
      repo: 'feTS',
      renderTitle({ passes }) {
        return passes ? '✅ Benchmark Results' : '❌ Benchmark Failed';
      },
      renderMessage({ passes, checks, thresholds }) {
        const result = [];

        if (thresholds.failures) {
          result.push(
            `**Performance regression detected**: it seems like your Pull Request adds some extra latency to GraphQL Yoga`,
          );
        }

        if (checks.failures) {
          result.push('**Failed assertions detected**');
        }

        if (!passes) {
          result.push(
            `> If the performance regression is expected, please increase the failing threshold.`,
          );
        }

        return result.join('\n');
      },
    });
  }
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

export function run() {
  const res = http.post(
    `http://localhost:4000/${__ENV.MODE}`,
    JSON.stringify({
      name: 'World',
    }),
  );

  const noErrors = `no_errors{mode:${__ENV.MODE}}`;
  const expectedResult = `expected_result{mode:${__ENV.MODE}}`;
  check(res, {
    [noErrors]: resp => resp.status === 200,
    [expectedResult]: resp => {
      const json = resp.json();
      return (
        !!json &&
        typeof json === 'object' &&
        !Array.isArray(json) &&
        'message' in json &&
        json.message === 'Hello, World!'
      );
    },
  });
}
