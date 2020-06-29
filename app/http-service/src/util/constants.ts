export enum HttpResponse {
    BadRequest = 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
    Unauthorized = 'The request has not been applied because it lacks valid authentication credentials for the target resource.',
    Forbidden = 'The server understood the request but refuses to authorize it.',
    NotFound = 'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
    Conflict = 'The request could not be completed due to a conflict with the current state of the target resource. This code is used in situations where the user might be able to resolve the conflict and resubmit the request.',
    InternalError = 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
    ServiceUnavailable = 'The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.',
}