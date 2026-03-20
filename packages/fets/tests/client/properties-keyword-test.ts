import { type NormalizeOAS, type OASModel } from '../../src/client';
import type propertiesKeywordOas from './fixtures/example-properties-keyword-oas';

// Test that OASModel works when a schema has a property named "properties"
// See: https://github.com/ardatan/feTS/issues/XXX
type CheckDeviceResponse = OASModel<NormalizeOAS<typeof propertiesKeywordOas>, 'CheckDeviceResponse'>;

// expiryDate should be typed as string (date-time format)
declare const response: CheckDeviceResponse;
const expiryDate: string | undefined = response.expiryDate;
void expiryDate;

// 'properties' property should be typed as Record<string, string>
const properties: Record<string, string> | undefined = response.properties;
void properties;

// sessionValidated should be typed as boolean
const sessionValidated: boolean | undefined = response.sessionValidated;
void sessionValidated;
