export default {
  swagger: '2.0',
  info: {
    title: 'Soccer v4 Stats',
    version: '1.0',
  },
  host: 'api.sportsdata.io',
  basePath: '/v4/soccer/stats',
  schemes: ['http', 'https'],
  securityDefinitions: {
    apiKeyHeader: {
      type: 'apiKey',
      name: 'Ocp-Apim-Subscription-Key',
      in: 'header',
    },
    apiKeyQuery: {
      type: 'apiKey',
      name: 'key',
      in: 'query',
    },
  },
  security: [
    {
      apiKeyHeader: [],
    },
    {
      apiKeyQuery: [],
    },
  ],
  paths: {
    '/{format}/GamesByDate/{competition}/{date}': {
      get: {
        description: 'Games by Date',
        operationId: 'GamesByDate',
        summary: 'Games by Date',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'date',
            in: 'path',
            description:
              'The date of the game(s).\n<br>Examples: <code>2017-02-27</code>, <code>2017-09-01</code>.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Game',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/Areas': {
      get: {
        description: 'Areas (Countries)',
        operationId: 'AreasCountries',
        summary: 'Areas (Countries)',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Area',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/Competitions': {
      get: {
        description: 'Competitions (Leagues)',
        operationId: 'CompetitionsLeagues',
        summary: 'Competitions (Leagues)',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Competition',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/Teams/{competition}': {
      get: {
        description: 'Teams',
        operationId: 'Teams',
        summary: 'Teams',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Team',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/Venues': {
      get: {
        description: 'Venues',
        operationId: 'Venues',
        summary: 'Venues',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Venue',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/SeasonTeams/{competition}/{seasonid}': {
      get: {
        description: 'Season Teams',
        operationId: 'SeasonTeams',
        summary: 'Season Teams',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'seasonid',
            in: 'path',
            description:
              'Unique FantasyData Season ID. SeasonIDs can be found in the Competition Hierarchy (League Hierarchy). \nExamples: <code>1</code>, <code>2</code>, <code>3</code>, etc',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/SeasonTeam',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/Schedule/{competition}/{season}': {
      get: {
        description: 'Schedule',
        operationId: 'Schedule',
        summary: 'Schedule',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'season',
            in: 'path',
            description:
              'Year of the season<br>Examples: <code>2020</code>, <code>2021</code>, etc.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Round',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/PlayersByTeam/{competition}/{teamid}': {
      get: {
        description: 'Players by Team',
        operationId: 'PlayersByTeam',
        summary: 'Players by Team',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'teamid',
            in: 'path',
            description: 'Unique FantasyData Team ID. \nExample:<code>516</code>.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Player',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/BoxScoresByDate/{competition}/{date}': {
      get: {
        description: 'Box Scores by Date',
        operationId: 'BoxScoresByDate',
        summary: 'Box Scores by Date',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'date',
            in: 'path',
            description:
              'The date of the game(s).\n<br>Examples: <code>2017-02-27</code>, <code>2017-09-01</code>.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/BoxScore',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/BoxScoresDeltaByDate/{competition}/{date}/{minutes}': {
      get: {
        description: 'Box Scores by Date Delta',
        operationId: 'BoxScoresByDateDelta',
        summary: 'Box Scores by Date Delta',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'date',
            in: 'path',
            description:
              'The date of the game(s).\n<br>Examples: <code>2017-02-27</code>, <code>2017-09-01</code>.',
            required: true,
            type: 'string',
          },
          {
            name: 'minutes',
            in: 'path',
            description:
              'Only returns player statistics that have changed in the last X minutes.  You specify how many minutes in time to go back. Valid entries are:\n<code>1</code>, <code>2</code> ... <code>all</code>.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/BoxScore',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/BoxScore/{competition}/{gameid}': {
      get: {
        description: 'Box Score',
        operationId: 'BoxScore',
        summary: 'Box Score',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'gameid',
            in: 'path',
            description:
              'The GameID of a Soccer game.  GameIDs can be found in the Games API.  Valid entries are <code>702</code>, <code>1274</code>, etc.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              $ref: '#/definitions/BoxScore',
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/PlayerGameStatsByDate/{competition}/{date}': {
      get: {
        description: 'Player Game Stats by Date',
        operationId: 'PlayerGameStatsByDate',
        summary: 'Player Game Stats by Date',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'date',
            in: 'path',
            description:
              'The date of the game(s).\n<br>Examples: <code>2017-02-27</code>, <code>2017-09-01</code>.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/PlayerGame',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/PlayerSeasonStats/{competition}/{season}': {
      get: {
        description: 'Player Season Stats',
        operationId: 'PlayerSeasonStats',
        summary: 'Player Season Stats',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'season',
            in: 'path',
            description:
              'Year of the season<br>Examples: <code>2020</code>, <code>2021</code>, etc.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Round',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/TeamSeasonStats/{competition}/{season}': {
      get: {
        description: 'Team Season Stats',
        operationId: 'TeamSeasonStats',
        summary: 'Team Season Stats',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'season',
            in: 'path',
            description:
              'Year of the season<br>Examples: <code>2020</code>, <code>2021</code>, etc.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Round',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/TeamGameStatsByDate/{competition}/{date}': {
      get: {
        description: 'Team Game Stats by Date',
        operationId: 'TeamGameStatsByDate',
        summary: 'Team Game Stats by Date',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'date',
            in: 'path',
            description:
              'The date of the game(s).\n<br>Examples: <code>2017-02-27</code>, <code>2017-09-01</code>.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/TeamGame',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/Standings/{competition}/{season}': {
      get: {
        description: 'Standings',
        operationId: 'Standings',
        summary: 'Standings',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'season',
            in: 'path',
            description:
              'Year of the season<br>Examples: <code>2020</code>, <code>2021</code>, etc.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Round',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/CompetitionDetails/{competition}': {
      get: {
        description: 'Competition Fixtures (League Details)',
        operationId: 'CompetitionFixturesLeagueDetails',
        summary: 'Competition Fixtures (League Details)',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              $ref: '#/definitions/CompetitionDetail',
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/HistoricalMembershipsByTeam/{competition}/{teamid}': {
      get: {
        description: 'Memberships by Team (Historical)',
        operationId: 'MembershipsByTeamHistorical',
        summary: 'Memberships by Team (Historical)',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'teamid',
            in: 'path',
            description: 'Unique FantasyData Team ID. \nExample:<code>516</code>.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Membership',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/ActiveMemberships/{competition}': {
      get: {
        description: 'Memberships (Active)',
        operationId: 'MembershipsActive',
        summary: 'Memberships (Active)',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Membership',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/RecentlyChangedMemberships/{competition}/{days}': {
      get: {
        description: 'Memberships (Recently Changed)',
        operationId: 'MembershipsRecentlyChanged',
        summary: 'Memberships (Recently Changed)',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            default: 'xml',
            enum: ['xml', 'json'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'days',
            in: 'path',
            description:
              "The number of days since memberships were updated. For example, if you pass <code>3</code>, you'll receive all memberships that have been updated in the past 3 days. Valid entries are: <code>1</code>, <code>2</code> ... <code>30</code>",
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: '',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Membership',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/DfsSlatesByDate/{competition}/{date}': {
      get: {
        description: 'Dfs Slates By Date',
        operationId: 'DfsSlatesByDate',
        summary: 'Dfs Slates By Date',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            enum: ['json', 'xml'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
          {
            name: 'date',
            in: 'path',
            description: 'The date of the game(s).\n<br>Examples: <code>2020-02-18</code>\n',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'null',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/DfsSlate',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
    '/{format}/UpcomingDfsSlatesByCompetition/{competition}': {
      get: {
        description: 'Upcoming Dfs Slates By Competition',
        operationId: 'UpcomingDfsSlatesByCompetition',
        summary: 'Upcoming Dfs Slates By Competition',
        parameters: [
          {
            name: 'format',
            in: 'path',
            description:
              'Desired response format. Valid entries are <code>XML</code> or <code>JSON</code>.',
            required: true,
            type: 'string',
            enum: ['json', 'xml'],
          },
          {
            name: 'competition',
            in: 'path',
            description:
              'An indication of a soccer competition/league. This value can be the CompetitionId or the Competition Key. Possible values include: <code>EPL</code>, <code>1</code>, <code>MLS</code>, <code>8</code>, etc.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'null',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/DfsSlate',
              },
            },
          },
        },
        produces: ['application/json'],
      },
    },
  },
  definitions: {
    Game: {
      properties: {
        GameId: {
          type: 'integer',
          'x-nullable': false,
        },
        RoundId: {
          type: 'integer',
          'x-nullable': false,
        },
        Season: {
          type: 'integer',
          'x-nullable': false,
        },
        SeasonType: {
          type: 'integer',
          'x-nullable': false,
        },
        Group: {
          type: 'string',
          'x-nullable': true,
        },
        AwayTeamId: {
          type: 'integer',
          'x-nullable': true,
        },
        HomeTeamId: {
          type: 'integer',
          'x-nullable': true,
        },
        VenueId: {
          type: 'integer',
          'x-nullable': true,
        },
        Day: {
          type: 'string',
          'x-nullable': true,
        },
        DateTime: {
          type: 'string',
          'x-nullable': true,
        },
        Status: {
          type: 'string',
          'x-nullable': true,
        },
        Week: {
          type: 'integer',
          'x-nullable': true,
        },
        Period: {
          type: 'string',
          'x-nullable': true,
        },
        Clock: {
          type: 'integer',
          'x-nullable': true,
        },
        Winner: {
          type: 'string',
          'x-nullable': true,
        },
        VenueType: {
          type: 'string',
          'x-nullable': true,
        },
        AwayTeamKey: {
          type: 'string',
          'x-nullable': true,
        },
        AwayTeamName: {
          type: 'string',
          'x-nullable': true,
        },
        AwayTeamCountryCode: {
          type: 'string',
          'x-nullable': true,
        },
        AwayTeamScore: {
          type: 'integer',
          'x-nullable': true,
        },
        AwayTeamScorePeriod1: {
          type: 'integer',
          'x-nullable': true,
        },
        AwayTeamScorePeriod2: {
          type: 'integer',
          'x-nullable': true,
        },
        AwayTeamScoreExtraTime: {
          type: 'integer',
          'x-nullable': true,
        },
        AwayTeamScorePenalty: {
          type: 'integer',
          'x-nullable': true,
        },
        HomeTeamKey: {
          type: 'string',
          'x-nullable': true,
        },
        HomeTeamName: {
          type: 'string',
          'x-nullable': true,
        },
        HomeTeamCountryCode: {
          type: 'string',
          'x-nullable': true,
        },
        HomeTeamScore: {
          type: 'integer',
          'x-nullable': true,
        },
        HomeTeamScorePeriod1: {
          type: 'integer',
          'x-nullable': true,
        },
        HomeTeamScorePeriod2: {
          type: 'integer',
          'x-nullable': true,
        },
        HomeTeamScoreExtraTime: {
          type: 'integer',
          'x-nullable': true,
        },
        HomeTeamScorePenalty: {
          type: 'integer',
          'x-nullable': true,
        },
        HomeTeamMoneyLine: {
          type: 'integer',
          'x-nullable': true,
        },
        AwayTeamMoneyLine: {
          type: 'integer',
          'x-nullable': true,
        },
        DrawMoneyLine: {
          type: 'integer',
          'x-nullable': true,
        },
        PointSpread: {
          type: 'number',
          'x-nullable': true,
        },
        HomeTeamPointSpreadPayout: {
          type: 'integer',
          'x-nullable': true,
        },
        AwayTeamPointSpreadPayout: {
          type: 'integer',
          'x-nullable': true,
        },
        OverUnder: {
          type: 'number',
          'x-nullable': true,
        },
        OverPayout: {
          type: 'integer',
          'x-nullable': true,
        },
        UnderPayout: {
          type: 'integer',
          'x-nullable': true,
        },
        Attendance: {
          type: 'integer',
          'x-nullable': true,
        },
        Updated: {
          type: 'string',
          'x-nullable': true,
        },
        UpdatedUtc: {
          type: 'string',
          'x-nullable': true,
        },
        GlobalGameId: {
          type: 'integer',
          'x-nullable': false,
        },
        GlobalAwayTeamId: {
          type: 'integer',
          'x-nullable': true,
        },
        GlobalHomeTeamId: {
          type: 'integer',
          'x-nullable': true,
        },
        ClockExtra: {
          type: 'integer',
          'x-nullable': true,
        },
        ClockDisplay: {
          type: 'string',
          'x-nullable': true,
        },
        IsClosed: {
          type: 'boolean',
          'x-nullable': true,
        },
        HomeTeamFormation: {
          type: 'string',
          'x-nullable': true,
        },
        AwayTeamFormation: {
          type: 'string',
          'x-nullable': true,
        },
        PlayoffAggregateScore: {
          $ref: '#/definitions/PlayoffAggregateScore',
        },
      },
    },
    PlayoffAggregateScore: {
      properties: {
        TeamA_Id: {
          type: 'integer',
          'x-nullable': false,
        },
        TeamA_AggregateScore: {
          type: 'integer',
          'x-nullable': false,
        },
        TeamB_Id: {
          type: 'integer',
          'x-nullable': false,
        },
        TeamB_AggregateScore: {
          type: 'integer',
          'x-nullable': false,
        },
        WinningTeamId: {
          type: 'integer',
          'x-nullable': false,
        },
        Created: {
          type: 'string',
          'x-nullable': true,
        },
        Updated: {
          type: 'string',
          'x-nullable': true,
        },
      },
    },
    Area: {
      properties: {
        AreaId: {
          type: 'integer',
          'x-nullable': false,
        },
        CountryCode: {
          type: 'string',
          'x-nullable': true,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        Competitions: {
          type: 'array',
          items: {
            $ref: '#/definitions/Competition',
          },
        },
      },
    },
    Competition: {
      properties: {
        CompetitionId: {
          type: 'integer',
          'x-nullable': false,
        },
        AreaId: {
          type: 'integer',
          'x-nullable': false,
        },
        AreaName: {
          type: 'string',
          'x-nullable': true,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        Gender: {
          type: 'string',
          'x-nullable': true,
        },
        Type: {
          type: 'string',
          'x-nullable': true,
        },
        Format: {
          type: 'string',
          'x-nullable': true,
        },
        Seasons: {
          type: 'array',
          items: {
            $ref: '#/definitions/Season',
          },
        },
        Key: {
          type: 'string',
          'x-nullable': true,
        },
      },
    },
    Season: {
      properties: {
        SeasonId: {
          type: 'integer',
          'x-nullable': false,
        },
        CompetitionId: {
          type: 'integer',
          'x-nullable': false,
        },
        Season: {
          type: 'integer',
          'x-nullable': false,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        CompetitionName: {
          type: 'string',
          'x-nullable': true,
        },
        StartDate: {
          type: 'string',
          'x-nullable': true,
        },
        EndDate: {
          type: 'string',
          'x-nullable': true,
        },
        CurrentSeason: {
          type: 'boolean',
          'x-nullable': false,
        },
        Rounds: {
          type: 'array',
          items: {
            $ref: '#/definitions/Round',
          },
        },
      },
    },
    Round: {
      properties: {
        RoundId: {
          type: 'integer',
          'x-nullable': false,
        },
        SeasonId: {
          type: 'integer',
          'x-nullable': false,
        },
        Season: {
          type: 'integer',
          'x-nullable': false,
        },
        SeasonType: {
          type: 'integer',
          'x-nullable': false,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        Type: {
          type: 'string',
          'x-nullable': true,
        },
        StartDate: {
          type: 'string',
          'x-nullable': true,
        },
        EndDate: {
          type: 'string',
          'x-nullable': true,
        },
        CurrentWeek: {
          type: 'integer',
          'x-nullable': true,
        },
        CurrentRound: {
          type: 'boolean',
          'x-nullable': false,
        },
        Games: {
          type: 'array',
          items: {
            $ref: '#/definitions/Game',
          },
        },
        Standings: {
          type: 'array',
          items: {
            $ref: '#/definitions/Standing',
          },
        },
        TeamSeasons: {
          type: 'array',
          items: {
            $ref: '#/definitions/TeamSeason',
          },
        },
        PlayerSeasons: {
          type: 'array',
          items: {
            $ref: '#/definitions/PlayerSeason',
          },
        },
      },
    },
    Standing: {
      properties: {
        StandingId: {
          type: 'integer',
          'x-nullable': false,
        },
        RoundId: {
          type: 'integer',
          'x-nullable': false,
        },
        TeamId: {
          type: 'integer',
          'x-nullable': false,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        ShortName: {
          type: 'string',
          'x-nullable': true,
        },
        Scope: {
          type: 'string',
          'x-nullable': true,
        },
        Order: {
          type: 'integer',
          'x-nullable': true,
        },
        Games: {
          type: 'integer',
          'x-nullable': true,
        },
        Wins: {
          type: 'integer',
          'x-nullable': true,
        },
        Losses: {
          type: 'integer',
          'x-nullable': true,
        },
        Draws: {
          type: 'integer',
          'x-nullable': true,
        },
        GoalsScored: {
          type: 'integer',
          'x-nullable': true,
        },
        GoalsAgainst: {
          type: 'integer',
          'x-nullable': true,
        },
        GoalsDifferential: {
          type: 'integer',
          'x-nullable': true,
        },
        Points: {
          type: 'integer',
          'x-nullable': true,
        },
        Group: {
          type: 'string',
          'x-nullable': true,
        },
        GlobalTeamID: {
          type: 'integer',
          'x-nullable': true,
        },
      },
    },
    TeamSeason: {
      properties: {
        StatId: {
          type: 'integer',
          'x-nullable': false,
        },
        SeasonType: {
          type: 'integer',
          'x-nullable': false,
        },
        Season: {
          type: 'integer',
          'x-nullable': false,
        },
        RoundId: {
          type: 'integer',
          'x-nullable': true,
        },
        TeamId: {
          type: 'integer',
          'x-nullable': true,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        Team: {
          type: 'string',
          'x-nullable': true,
        },
        GlobalTeamId: {
          type: 'integer',
          'x-nullable': true,
        },
        Possession: {
          type: 'number',
          'x-nullable': true,
        },
        Updated: {
          type: 'string',
          'x-nullable': true,
        },
        UpdatedUtc: {
          type: 'string',
          'x-nullable': true,
        },
        Games: {
          type: 'integer',
          'x-nullable': true,
        },
        FantasyPoints: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsFanDuel: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsDraftKings: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsYahoo: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsMondogoal: {
          type: 'number',
          'x-nullable': true,
        },
        Minutes: {
          type: 'number',
          'x-nullable': true,
        },
        Goals: {
          type: 'number',
          'x-nullable': true,
        },
        Assists: {
          type: 'number',
          'x-nullable': true,
        },
        Shots: {
          type: 'number',
          'x-nullable': true,
        },
        ShotsOnGoal: {
          type: 'number',
          'x-nullable': true,
        },
        YellowCards: {
          type: 'number',
          'x-nullable': true,
        },
        RedCards: {
          type: 'number',
          'x-nullable': true,
        },
        YellowRedCards: {
          type: 'number',
          'x-nullable': true,
        },
        Crosses: {
          type: 'number',
          'x-nullable': true,
        },
        TacklesWon: {
          type: 'number',
          'x-nullable': true,
        },
        Interceptions: {
          type: 'number',
          'x-nullable': true,
        },
        OwnGoals: {
          type: 'number',
          'x-nullable': true,
        },
        Fouls: {
          type: 'number',
          'x-nullable': true,
        },
        Fouled: {
          type: 'number',
          'x-nullable': true,
        },
        Offsides: {
          type: 'number',
          'x-nullable': true,
        },
        Passes: {
          type: 'number',
          'x-nullable': true,
        },
        PassesCompleted: {
          type: 'number',
          'x-nullable': true,
        },
        LastManTackle: {
          type: 'number',
          'x-nullable': true,
        },
        CornersWon: {
          type: 'number',
          'x-nullable': true,
        },
        BlockedShots: {
          type: 'number',
          'x-nullable': true,
        },
        Touches: {
          type: 'number',
          'x-nullable': true,
        },
        DefenderCleanSheets: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperSaves: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperGoalsAgainst: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperSingleGoalAgainst: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperCleanSheets: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperWins: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltyKickGoals: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltyKickMisses: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltyKickSaves: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltiesWon: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltiesConceded: {
          type: 'number',
          'x-nullable': true,
        },
        Score: {
          type: 'number',
          'x-nullable': true,
        },
        OpponentScore: {
          type: 'number',
          'x-nullable': true,
        },
        Tackles: {
          type: 'number',
          'x-nullable': true,
        },
      },
    },
    PlayerSeason: {
      properties: {
        StatId: {
          type: 'integer',
          'x-nullable': false,
        },
        SeasonType: {
          type: 'integer',
          'x-nullable': false,
        },
        Season: {
          type: 'integer',
          'x-nullable': false,
        },
        RoundId: {
          type: 'integer',
          'x-nullable': true,
        },
        TeamId: {
          type: 'integer',
          'x-nullable': true,
        },
        PlayerId: {
          type: 'integer',
          'x-nullable': true,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        ShortName: {
          type: 'string',
          'x-nullable': true,
        },
        Team: {
          type: 'string',
          'x-nullable': true,
        },
        PositionCategory: {
          type: 'string',
          'x-nullable': true,
        },
        Position: {
          type: 'string',
          'x-nullable': true,
        },
        Started: {
          type: 'integer',
          'x-nullable': true,
        },
        GlobalTeamId: {
          type: 'integer',
          'x-nullable': true,
        },
        Updated: {
          type: 'string',
          'x-nullable': true,
        },
        UpdatedUtc: {
          type: 'string',
          'x-nullable': true,
        },
        Games: {
          type: 'integer',
          'x-nullable': true,
        },
        FantasyPoints: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsFanDuel: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsDraftKings: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsYahoo: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsMondogoal: {
          type: 'number',
          'x-nullable': true,
        },
        Minutes: {
          type: 'number',
          'x-nullable': true,
        },
        Goals: {
          type: 'number',
          'x-nullable': true,
        },
        Assists: {
          type: 'number',
          'x-nullable': true,
        },
        Shots: {
          type: 'number',
          'x-nullable': true,
        },
        ShotsOnGoal: {
          type: 'number',
          'x-nullable': true,
        },
        YellowCards: {
          type: 'number',
          'x-nullable': true,
        },
        RedCards: {
          type: 'number',
          'x-nullable': true,
        },
        YellowRedCards: {
          type: 'number',
          'x-nullable': true,
        },
        Crosses: {
          type: 'number',
          'x-nullable': true,
        },
        TacklesWon: {
          type: 'number',
          'x-nullable': true,
        },
        Interceptions: {
          type: 'number',
          'x-nullable': true,
        },
        OwnGoals: {
          type: 'number',
          'x-nullable': true,
        },
        Fouls: {
          type: 'number',
          'x-nullable': true,
        },
        Fouled: {
          type: 'number',
          'x-nullable': true,
        },
        Offsides: {
          type: 'number',
          'x-nullable': true,
        },
        Passes: {
          type: 'number',
          'x-nullable': true,
        },
        PassesCompleted: {
          type: 'number',
          'x-nullable': true,
        },
        LastManTackle: {
          type: 'number',
          'x-nullable': true,
        },
        CornersWon: {
          type: 'number',
          'x-nullable': true,
        },
        BlockedShots: {
          type: 'number',
          'x-nullable': true,
        },
        Touches: {
          type: 'number',
          'x-nullable': true,
        },
        DefenderCleanSheets: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperSaves: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperGoalsAgainst: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperSingleGoalAgainst: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperCleanSheets: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperWins: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltyKickGoals: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltyKickMisses: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltyKickSaves: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltiesWon: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltiesConceded: {
          type: 'number',
          'x-nullable': true,
        },
        Score: {
          type: 'number',
          'x-nullable': true,
        },
        OpponentScore: {
          type: 'number',
          'x-nullable': true,
        },
        Tackles: {
          type: 'number',
          'x-nullable': true,
        },
      },
    },
    Team: {
      properties: {
        TeamId: {
          type: 'integer',
          'x-nullable': false,
        },
        AreaId: {
          type: 'integer',
          'x-nullable': true,
        },
        VenueId: {
          type: 'integer',
          'x-nullable': true,
        },
        Key: {
          type: 'string',
          'x-nullable': true,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        FullName: {
          type: 'string',
          'x-nullable': true,
        },
        Active: {
          type: 'boolean',
          'x-nullable': false,
        },
        AreaName: {
          type: 'string',
          'x-nullable': true,
        },
        VenueName: {
          type: 'string',
          'x-nullable': true,
        },
        Gender: {
          type: 'string',
          'x-nullable': true,
        },
        Type: {
          type: 'string',
          'x-nullable': true,
        },
        Address: {
          type: 'string',
          'x-nullable': true,
        },
        City: {
          type: 'string',
          'x-nullable': true,
        },
        Zip: {
          type: 'string',
          'x-nullable': true,
        },
        Phone: {
          type: 'string',
          'x-nullable': true,
        },
        Fax: {
          type: 'string',
          'x-nullable': true,
        },
        Website: {
          type: 'string',
          'x-nullable': true,
        },
        Email: {
          type: 'string',
          'x-nullable': true,
        },
        Founded: {
          type: 'integer',
          'x-nullable': true,
        },
        ClubColor1: {
          type: 'string',
          'x-nullable': true,
        },
        ClubColor2: {
          type: 'string',
          'x-nullable': true,
        },
        ClubColor3: {
          type: 'string',
          'x-nullable': true,
        },
        Nickname1: {
          type: 'string',
          'x-nullable': true,
        },
        Nickname2: {
          type: 'string',
          'x-nullable': true,
        },
        Nickname3: {
          type: 'string',
          'x-nullable': true,
        },
        WikipediaLogoUrl: {
          type: 'string',
          'x-nullable': true,
        },
        WikipediaWordMarkUrl: {
          type: 'string',
          'x-nullable': true,
        },
        GlobalTeamId: {
          type: 'integer',
          'x-nullable': false,
        },
      },
    },
    Venue: {
      properties: {
        VenueId: {
          type: 'integer',
          'x-nullable': false,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        Address: {
          type: 'string',
          'x-nullable': true,
        },
        City: {
          type: 'string',
          'x-nullable': true,
        },
        Zip: {
          type: 'string',
          'x-nullable': true,
        },
        Country: {
          type: 'string',
          'x-nullable': true,
        },
        Open: {
          type: 'boolean',
          'x-nullable': false,
        },
        Opened: {
          type: 'integer',
          'x-nullable': true,
        },
        Nickname1: {
          type: 'string',
          'x-nullable': true,
        },
        Nickname2: {
          type: 'string',
          'x-nullable': true,
        },
        Capacity: {
          type: 'integer',
          'x-nullable': true,
        },
        Surface: {
          type: 'string',
          'x-nullable': true,
        },
        GeoLat: {
          type: 'number',
          'x-nullable': true,
        },
        GeoLong: {
          type: 'number',
          'x-nullable': true,
        },
      },
    },
    SeasonTeam: {
      properties: {
        SeasonTeamId: {
          type: 'integer',
          'x-nullable': false,
        },
        SeasonId: {
          type: 'integer',
          'x-nullable': false,
        },
        TeamId: {
          type: 'integer',
          'x-nullable': false,
        },
        TeamName: {
          type: 'string',
          'x-nullable': true,
        },
        Active: {
          type: 'boolean',
          'x-nullable': false,
        },
        Gender: {
          type: 'string',
          'x-nullable': true,
        },
        Type: {
          type: 'string',
          'x-nullable': true,
        },
        Team: {
          $ref: '#/definitions/Team',
        },
      },
    },
    Player: {
      properties: {
        PlayerId: {
          type: 'integer',
          'x-nullable': false,
        },
        FirstName: {
          type: 'string',
          'x-nullable': true,
        },
        LastName: {
          type: 'string',
          'x-nullable': true,
        },
        CommonName: {
          type: 'string',
          'x-nullable': true,
        },
        ShortName: {
          type: 'string',
          'x-nullable': true,
        },
        Position: {
          type: 'string',
          'x-nullable': true,
        },
        PositionCategory: {
          type: 'string',
          'x-nullable': true,
        },
        Jersey: {
          type: 'integer',
          'x-nullable': true,
        },
        Foot: {
          type: 'string',
          'x-nullable': true,
        },
        Height: {
          type: 'integer',
          'x-nullable': true,
        },
        Weight: {
          type: 'integer',
          'x-nullable': true,
        },
        Gender: {
          type: 'string',
          'x-nullable': true,
        },
        BirthDate: {
          type: 'string',
          'x-nullable': true,
        },
        BirthCity: {
          type: 'string',
          'x-nullable': true,
        },
        BirthCountry: {
          type: 'string',
          'x-nullable': true,
        },
        Nationality: {
          type: 'string',
          'x-nullable': true,
        },
        InjuryStatus: {
          type: 'string',
          'x-nullable': true,
        },
        InjuryBodyPart: {
          type: 'string',
          'x-nullable': true,
        },
        InjuryNotes: {
          type: 'string',
          'x-nullable': true,
        },
        InjuryStartDate: {
          type: 'string',
          'x-nullable': true,
        },
        Updated: {
          type: 'string',
          'x-nullable': true,
        },
        PhotoUrl: {
          type: 'string',
          'x-nullable': true,
        },
        RotoWirePlayerID: {
          type: 'integer',
          'x-nullable': true,
        },
        DraftKingsPosition: {
          type: 'string',
          'x-nullable': true,
        },
        UsaTodayPlayerID: {
          type: 'integer',
          'x-nullable': true,
        },
        UsaTodayHeadshotUrl: {
          type: 'string',
          'x-nullable': true,
        },
        UsaTodayHeadshotNoBackgroundUrl: {
          type: 'string',
          'x-nullable': true,
        },
        UsaTodayHeadshotUpdated: {
          type: 'string',
          'x-nullable': true,
        },
        UsaTodayHeadshotNoBackgroundUpdated: {
          type: 'string',
          'x-nullable': true,
        },
      },
    },
    BoxScore: {
      properties: {
        Game: {
          $ref: '#/definitions/Game',
        },
        AwayTeamCoach: {
          $ref: '#/definitions/Coach',
        },
        HomeTeamCoach: {
          $ref: '#/definitions/Coach',
        },
        MainReferee: {
          $ref: '#/definitions/Referee',
        },
        AssistantReferee1: {
          $ref: '#/definitions/Referee',
        },
        AssistantReferee2: {
          $ref: '#/definitions/Referee',
        },
        FourthReferee: {
          $ref: '#/definitions/Referee',
        },
        AdditionalAssistantReferee1: {
          $ref: '#/definitions/Referee',
        },
        AdditionalAssistantReferee2: {
          $ref: '#/definitions/Referee',
        },
        Lineups: {
          type: 'array',
          items: {
            $ref: '#/definitions/Lineup',
          },
        },
        Goals: {
          type: 'array',
          items: {
            $ref: '#/definitions/Goal',
          },
        },
        Bookings: {
          type: 'array',
          items: {
            $ref: '#/definitions/Booking',
          },
        },
        PenaltyShootouts: {
          type: 'array',
          items: {
            $ref: '#/definitions/PenaltyShootout',
          },
        },
        TeamGames: {
          type: 'array',
          items: {
            $ref: '#/definitions/TeamGame',
          },
        },
        PlayerGames: {
          type: 'array',
          items: {
            $ref: '#/definitions/PlayerGame',
          },
        },
        VideoAssistantReferee: {
          $ref: '#/definitions/Referee',
        },
      },
    },
    Coach: {
      properties: {
        CoachId: {
          type: 'integer',
          'x-nullable': false,
        },
        FirstName: {
          type: 'string',
          'x-nullable': true,
        },
        LastName: {
          type: 'string',
          'x-nullable': true,
        },
        ShortName: {
          type: 'string',
          'x-nullable': true,
        },
        Nationality: {
          type: 'string',
          'x-nullable': true,
        },
      },
    },
    Referee: {
      properties: {
        RefereeId: {
          type: 'integer',
          'x-nullable': false,
        },
        FirstName: {
          type: 'string',
          'x-nullable': true,
        },
        LastName: {
          type: 'string',
          'x-nullable': true,
        },
        ShortName: {
          type: 'string',
          'x-nullable': true,
        },
        Nationality: {
          type: 'string',
          'x-nullable': true,
        },
      },
    },
    Lineup: {
      properties: {
        LineupId: {
          type: 'integer',
          'x-nullable': false,
        },
        GameId: {
          type: 'integer',
          'x-nullable': false,
        },
        Type: {
          type: 'string',
          'x-nullable': true,
        },
        TeamId: {
          type: 'integer',
          'x-nullable': false,
        },
        PlayerId: {
          type: 'integer',
          'x-nullable': false,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        Position: {
          type: 'string',
          'x-nullable': true,
        },
        ReplacedPlayerId: {
          type: 'integer',
          'x-nullable': true,
        },
        ReplacedPlayerName: {
          type: 'string',
          'x-nullable': true,
        },
        GameMinute: {
          type: 'integer',
          'x-nullable': true,
        },
        GameMinuteExtra: {
          type: 'integer',
          'x-nullable': true,
        },
        PitchPositionHorizontal: {
          type: 'integer',
          'x-nullable': true,
        },
        PitchPositionVertical: {
          type: 'integer',
          'x-nullable': true,
        },
      },
    },
    Goal: {
      properties: {
        GoalId: {
          type: 'integer',
          'x-nullable': false,
        },
        GameId: {
          type: 'integer',
          'x-nullable': false,
        },
        TeamId: {
          type: 'integer',
          'x-nullable': false,
        },
        PlayerId: {
          type: 'integer',
          'x-nullable': true,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        Type: {
          type: 'string',
          'x-nullable': true,
        },
        AssistedByPlayerId1: {
          type: 'integer',
          'x-nullable': true,
        },
        AssistedByPlayerName1: {
          type: 'string',
          'x-nullable': true,
        },
        AssistedByPlayerId2: {
          type: 'integer',
          'x-nullable': true,
        },
        AssistedByPlayerName2: {
          type: 'string',
          'x-nullable': true,
        },
        GameMinute: {
          type: 'integer',
          'x-nullable': true,
        },
        GameMinuteExtra: {
          type: 'integer',
          'x-nullable': true,
        },
      },
    },
    Booking: {
      properties: {
        BookingId: {
          type: 'integer',
          'x-nullable': false,
        },
        GameId: {
          type: 'integer',
          'x-nullable': false,
        },
        Type: {
          type: 'string',
          'x-nullable': true,
        },
        TeamId: {
          type: 'integer',
          'x-nullable': false,
        },
        PlayerId: {
          type: 'integer',
          'x-nullable': true,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        GameMinute: {
          type: 'integer',
          'x-nullable': true,
        },
        GameMinuteExtra: {
          type: 'integer',
          'x-nullable': true,
        },
      },
    },
    PenaltyShootout: {
      properties: {
        PenaltyShootoutId: {
          type: 'integer',
          'x-nullable': false,
        },
        GameId: {
          type: 'integer',
          'x-nullable': false,
        },
        Type: {
          type: 'string',
          'x-nullable': true,
        },
        TeamId: {
          type: 'integer',
          'x-nullable': false,
        },
        PlayerId: {
          type: 'integer',
          'x-nullable': true,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        Position: {
          type: 'string',
          'x-nullable': true,
        },
        Order: {
          type: 'integer',
          'x-nullable': false,
        },
      },
    },
    TeamGame: {
      properties: {
        StatId: {
          type: 'integer',
          'x-nullable': false,
        },
        SeasonType: {
          type: 'integer',
          'x-nullable': false,
        },
        Season: {
          type: 'integer',
          'x-nullable': false,
        },
        RoundId: {
          type: 'integer',
          'x-nullable': true,
        },
        TeamId: {
          type: 'integer',
          'x-nullable': true,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        Team: {
          type: 'string',
          'x-nullable': true,
        },
        GlobalTeamId: {
          type: 'integer',
          'x-nullable': true,
        },
        Possession: {
          type: 'number',
          'x-nullable': true,
        },
        GameId: {
          type: 'integer',
          'x-nullable': true,
        },
        OpponentId: {
          type: 'integer',
          'x-nullable': true,
        },
        Opponent: {
          type: 'string',
          'x-nullable': true,
        },
        Day: {
          type: 'string',
          'x-nullable': true,
        },
        DateTime: {
          type: 'string',
          'x-nullable': true,
        },
        HomeOrAway: {
          type: 'string',
          'x-nullable': true,
        },
        IsGameOver: {
          type: 'boolean',
          'x-nullable': false,
        },
        GlobalGameId: {
          type: 'integer',
          'x-nullable': true,
        },
        GlobalOpponentId: {
          type: 'integer',
          'x-nullable': true,
        },
        Updated: {
          type: 'string',
          'x-nullable': true,
        },
        UpdatedUtc: {
          type: 'string',
          'x-nullable': true,
        },
        Games: {
          type: 'integer',
          'x-nullable': true,
        },
        FantasyPoints: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsFanDuel: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsDraftKings: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsYahoo: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsMondogoal: {
          type: 'number',
          'x-nullable': true,
        },
        Minutes: {
          type: 'number',
          'x-nullable': true,
        },
        Goals: {
          type: 'number',
          'x-nullable': true,
        },
        Assists: {
          type: 'number',
          'x-nullable': true,
        },
        Shots: {
          type: 'number',
          'x-nullable': true,
        },
        ShotsOnGoal: {
          type: 'number',
          'x-nullable': true,
        },
        YellowCards: {
          type: 'number',
          'x-nullable': true,
        },
        RedCards: {
          type: 'number',
          'x-nullable': true,
        },
        YellowRedCards: {
          type: 'number',
          'x-nullable': true,
        },
        Crosses: {
          type: 'number',
          'x-nullable': true,
        },
        TacklesWon: {
          type: 'number',
          'x-nullable': true,
        },
        Interceptions: {
          type: 'number',
          'x-nullable': true,
        },
        OwnGoals: {
          type: 'number',
          'x-nullable': true,
        },
        Fouls: {
          type: 'number',
          'x-nullable': true,
        },
        Fouled: {
          type: 'number',
          'x-nullable': true,
        },
        Offsides: {
          type: 'number',
          'x-nullable': true,
        },
        Passes: {
          type: 'number',
          'x-nullable': true,
        },
        PassesCompleted: {
          type: 'number',
          'x-nullable': true,
        },
        LastManTackle: {
          type: 'number',
          'x-nullable': true,
        },
        CornersWon: {
          type: 'number',
          'x-nullable': true,
        },
        BlockedShots: {
          type: 'number',
          'x-nullable': true,
        },
        Touches: {
          type: 'number',
          'x-nullable': true,
        },
        DefenderCleanSheets: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperSaves: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperGoalsAgainst: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperSingleGoalAgainst: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperCleanSheets: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperWins: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltyKickGoals: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltyKickMisses: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltyKickSaves: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltiesWon: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltiesConceded: {
          type: 'number',
          'x-nullable': true,
        },
        Score: {
          type: 'number',
          'x-nullable': true,
        },
        OpponentScore: {
          type: 'number',
          'x-nullable': true,
        },
        Tackles: {
          type: 'number',
          'x-nullable': true,
        },
      },
    },
    PlayerGame: {
      properties: {
        StatId: {
          type: 'integer',
          'x-nullable': false,
        },
        SeasonType: {
          type: 'integer',
          'x-nullable': false,
        },
        Season: {
          type: 'integer',
          'x-nullable': false,
        },
        RoundId: {
          type: 'integer',
          'x-nullable': true,
        },
        TeamId: {
          type: 'integer',
          'x-nullable': true,
        },
        PlayerId: {
          type: 'integer',
          'x-nullable': true,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        ShortName: {
          type: 'string',
          'x-nullable': true,
        },
        Team: {
          type: 'string',
          'x-nullable': true,
        },
        PositionCategory: {
          type: 'string',
          'x-nullable': true,
        },
        Position: {
          type: 'string',
          'x-nullable': true,
        },
        Jersey: {
          type: 'integer',
          'x-nullable': true,
        },
        Started: {
          type: 'integer',
          'x-nullable': true,
        },
        Captain: {
          type: 'boolean',
          'x-nullable': true,
        },
        Suspension: {
          type: 'boolean',
          'x-nullable': true,
        },
        SuspensionReason: {
          type: 'string',
          'x-nullable': true,
        },
        FanDuelSalary: {
          type: 'integer',
          'x-nullable': true,
        },
        DraftKingsSalary: {
          type: 'integer',
          'x-nullable': true,
        },
        YahooSalary: {
          type: 'integer',
          'x-nullable': true,
        },
        MondogoalSalary: {
          type: 'integer',
          'x-nullable': true,
        },
        FanDuelPosition: {
          type: 'string',
          'x-nullable': true,
        },
        DraftKingsPosition: {
          type: 'string',
          'x-nullable': true,
        },
        YahooPosition: {
          type: 'string',
          'x-nullable': true,
        },
        MondogoalPosition: {
          type: 'string',
          'x-nullable': true,
        },
        InjuryStatus: {
          type: 'string',
          'x-nullable': true,
        },
        InjuryBodyPart: {
          type: 'string',
          'x-nullable': true,
        },
        InjuryNotes: {
          type: 'string',
          'x-nullable': true,
        },
        InjuryStartDate: {
          type: 'string',
          'x-nullable': true,
        },
        GlobalTeamId: {
          type: 'integer',
          'x-nullable': true,
        },
        GameId: {
          type: 'integer',
          'x-nullable': true,
        },
        OpponentId: {
          type: 'integer',
          'x-nullable': true,
        },
        Opponent: {
          type: 'string',
          'x-nullable': true,
        },
        Day: {
          type: 'string',
          'x-nullable': true,
        },
        DateTime: {
          type: 'string',
          'x-nullable': true,
        },
        HomeOrAway: {
          type: 'string',
          'x-nullable': true,
        },
        IsGameOver: {
          type: 'boolean',
          'x-nullable': false,
        },
        GlobalGameId: {
          type: 'integer',
          'x-nullable': true,
        },
        GlobalOpponentId: {
          type: 'integer',
          'x-nullable': true,
        },
        Updated: {
          type: 'string',
          'x-nullable': true,
        },
        UpdatedUtc: {
          type: 'string',
          'x-nullable': true,
        },
        Games: {
          type: 'integer',
          'x-nullable': true,
        },
        FantasyPoints: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsFanDuel: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsDraftKings: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsYahoo: {
          type: 'number',
          'x-nullable': true,
        },
        FantasyPointsMondogoal: {
          type: 'number',
          'x-nullable': true,
        },
        Minutes: {
          type: 'number',
          'x-nullable': true,
        },
        Goals: {
          type: 'number',
          'x-nullable': true,
        },
        Assists: {
          type: 'number',
          'x-nullable': true,
        },
        Shots: {
          type: 'number',
          'x-nullable': true,
        },
        ShotsOnGoal: {
          type: 'number',
          'x-nullable': true,
        },
        YellowCards: {
          type: 'number',
          'x-nullable': true,
        },
        RedCards: {
          type: 'number',
          'x-nullable': true,
        },
        YellowRedCards: {
          type: 'number',
          'x-nullable': true,
        },
        Crosses: {
          type: 'number',
          'x-nullable': true,
        },
        TacklesWon: {
          type: 'number',
          'x-nullable': true,
        },
        Interceptions: {
          type: 'number',
          'x-nullable': true,
        },
        OwnGoals: {
          type: 'number',
          'x-nullable': true,
        },
        Fouls: {
          type: 'number',
          'x-nullable': true,
        },
        Fouled: {
          type: 'number',
          'x-nullable': true,
        },
        Offsides: {
          type: 'number',
          'x-nullable': true,
        },
        Passes: {
          type: 'number',
          'x-nullable': true,
        },
        PassesCompleted: {
          type: 'number',
          'x-nullable': true,
        },
        LastManTackle: {
          type: 'number',
          'x-nullable': true,
        },
        CornersWon: {
          type: 'number',
          'x-nullable': true,
        },
        BlockedShots: {
          type: 'number',
          'x-nullable': true,
        },
        Touches: {
          type: 'number',
          'x-nullable': true,
        },
        DefenderCleanSheets: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperSaves: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperGoalsAgainst: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperSingleGoalAgainst: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperCleanSheets: {
          type: 'number',
          'x-nullable': true,
        },
        GoalkeeperWins: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltyKickGoals: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltyKickMisses: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltyKickSaves: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltiesWon: {
          type: 'number',
          'x-nullable': true,
        },
        PenaltiesConceded: {
          type: 'number',
          'x-nullable': true,
        },
        Score: {
          type: 'number',
          'x-nullable': true,
        },
        OpponentScore: {
          type: 'number',
          'x-nullable': true,
        },
        Tackles: {
          type: 'number',
          'x-nullable': true,
        },
      },
    },
    CompetitionDetail: {
      properties: {
        CurrentSeason: {
          $ref: '#/definitions/Season',
        },
        Teams: {
          type: 'array',
          items: {
            $ref: '#/definitions/TeamDetail',
          },
        },
        Games: {
          type: 'array',
          items: {
            $ref: '#/definitions/Game',
          },
        },
        CompetitionId: {
          type: 'integer',
          'x-nullable': false,
        },
        AreaId: {
          type: 'integer',
          'x-nullable': false,
        },
        AreaName: {
          type: 'string',
          'x-nullable': true,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        Gender: {
          type: 'string',
          'x-nullable': true,
        },
        Type: {
          type: 'string',
          'x-nullable': true,
        },
        Format: {
          type: 'string',
          'x-nullable': true,
        },
        Seasons: {
          type: 'array',
          items: {
            $ref: '#/definitions/Season',
          },
        },
        Key: {
          type: 'string',
          'x-nullable': true,
        },
      },
    },
    TeamDetail: {
      properties: {
        Players: {
          type: 'array',
          items: {
            $ref: '#/definitions/Player',
          },
        },
        TeamId: {
          type: 'integer',
          'x-nullable': false,
        },
        AreaId: {
          type: 'integer',
          'x-nullable': true,
        },
        VenueId: {
          type: 'integer',
          'x-nullable': true,
        },
        Key: {
          type: 'string',
          'x-nullable': true,
        },
        Name: {
          type: 'string',
          'x-nullable': true,
        },
        FullName: {
          type: 'string',
          'x-nullable': true,
        },
        Active: {
          type: 'boolean',
          'x-nullable': false,
        },
        AreaName: {
          type: 'string',
          'x-nullable': true,
        },
        VenueName: {
          type: 'string',
          'x-nullable': true,
        },
        Gender: {
          type: 'string',
          'x-nullable': true,
        },
        Type: {
          type: 'string',
          'x-nullable': true,
        },
        Address: {
          type: 'string',
          'x-nullable': true,
        },
        City: {
          type: 'string',
          'x-nullable': true,
        },
        Zip: {
          type: 'string',
          'x-nullable': true,
        },
        Phone: {
          type: 'string',
          'x-nullable': true,
        },
        Fax: {
          type: 'string',
          'x-nullable': true,
        },
        Website: {
          type: 'string',
          'x-nullable': true,
        },
        Email: {
          type: 'string',
          'x-nullable': true,
        },
        Founded: {
          type: 'integer',
          'x-nullable': true,
        },
        ClubColor1: {
          type: 'string',
          'x-nullable': true,
        },
        ClubColor2: {
          type: 'string',
          'x-nullable': true,
        },
        ClubColor3: {
          type: 'string',
          'x-nullable': true,
        },
        Nickname1: {
          type: 'string',
          'x-nullable': true,
        },
        Nickname2: {
          type: 'string',
          'x-nullable': true,
        },
        Nickname3: {
          type: 'string',
          'x-nullable': true,
        },
        WikipediaLogoUrl: {
          type: 'string',
          'x-nullable': true,
        },
        WikipediaWordMarkUrl: {
          type: 'string',
          'x-nullable': true,
        },
        GlobalTeamId: {
          type: 'integer',
          'x-nullable': false,
        },
      },
    },
    Membership: {
      properties: {
        MembershipId: {
          type: 'integer',
          'x-nullable': false,
        },
        TeamId: {
          type: 'integer',
          'x-nullable': false,
        },
        PlayerId: {
          type: 'integer',
          'x-nullable': false,
        },
        PlayerName: {
          type: 'string',
          'x-nullable': true,
        },
        TeamName: {
          type: 'string',
          'x-nullable': true,
        },
        TeamArea: {
          type: 'string',
          'x-nullable': true,
        },
        Active: {
          type: 'boolean',
          'x-nullable': false,
        },
        StartDate: {
          type: 'string',
          'x-nullable': true,
        },
        EndDate: {
          type: 'string',
          'x-nullable': true,
        },
        Updated: {
          type: 'string',
          'x-nullable': true,
        },
        Jersey: {
          type: 'integer',
          'x-nullable': true,
        },
      },
    },
    DfsSlate: {
      properties: {
        SlateID: {
          type: 'integer',
          'x-nullable': false,
        },
        Operator: {
          type: 'string',
          'x-nullable': true,
        },
        OperatorSlateID: {
          type: 'integer',
          'x-nullable': true,
        },
        OperatorName: {
          type: 'string',
          'x-nullable': true,
        },
        OperatorDay: {
          type: 'string',
          'x-nullable': true,
        },
        OperatorStartTime: {
          type: 'string',
          'x-nullable': true,
        },
        NumberOfGames: {
          type: 'integer',
          'x-nullable': true,
        },
        IsMultiDaySlate: {
          type: 'boolean',
          'x-nullable': true,
        },
        RemovedByOperator: {
          type: 'boolean',
          'x-nullable': true,
        },
        OperatorGameType: {
          type: 'string',
          'x-nullable': true,
        },
        DfsSlateGames: {
          type: 'array',
          items: {
            $ref: '#/definitions/DfsSlateGame',
          },
        },
        DfsSlatePlayers: {
          type: 'array',
          items: {
            $ref: '#/definitions/DfsSlatePlayer',
          },
        },
        SlateRosterSlots: {
          type: 'array',
          items: {
            type: 'string',
            'x-nullable': true,
          },
        },
        SalaryCap: {
          type: 'integer',
          'x-nullable': true,
        },
        CompetitionId: {
          type: 'integer',
          'x-nullable': true,
        },
      },
    },
    DfsSlateGame: {
      properties: {
        SlateGameID: {
          type: 'integer',
          'x-nullable': false,
        },
        SlateID: {
          type: 'integer',
          'x-nullable': false,
        },
        GameID: {
          type: 'integer',
          'x-nullable': true,
        },
        Game: {
          $ref: '#/definitions/Game',
        },
        OperatorGameID: {
          type: 'integer',
          'x-nullable': true,
        },
        RemovedByOperator: {
          type: 'boolean',
          'x-nullable': true,
        },
      },
    },
    DfsSlatePlayer: {
      properties: {
        SlatePlayerID: {
          type: 'integer',
          'x-nullable': false,
        },
        SlateID: {
          type: 'integer',
          'x-nullable': false,
        },
        SlateGameID: {
          type: 'integer',
          'x-nullable': true,
        },
        PlayerID: {
          type: 'integer',
          'x-nullable': true,
        },
        PlayerGameProjectionStatID: {
          type: 'integer',
          'x-nullable': true,
        },
        OperatorPlayerID: {
          type: 'string',
          'x-nullable': true,
        },
        OperatorSlatePlayerID: {
          type: 'string',
          'x-nullable': true,
        },
        OperatorPlayerName: {
          type: 'string',
          'x-nullable': true,
        },
        OperatorPosition: {
          type: 'string',
          'x-nullable': true,
        },
        OperatorSalary: {
          type: 'integer',
          'x-nullable': true,
        },
        OperatorRosterSlots: {
          type: 'array',
          items: {
            type: 'string',
            'x-nullable': true,
          },
        },
        RemovedByOperator: {
          type: 'boolean',
          'x-nullable': true,
        },
        Team: {
          type: 'string',
          'x-nullable': true,
        },
        TeamID: {
          type: 'integer',
          'x-nullable': true,
        },
      },
    },
  },
  tags: [],
} as const;
