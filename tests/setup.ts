import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Registered explicitly, so renders never accumulate between tests.
afterEach(cleanup);
