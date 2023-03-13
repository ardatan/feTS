import { withGuildDocs } from '@theguild/components/next.config';

export default withGuildDocs({
  images: {
    unoptimized: true, // doesn't work with `next export`
  },
});
