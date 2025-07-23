export const UNAUTHORIZED_ERRORS = {
  // Auth
  INVALID_TOKEN: 'The token provided is not valid.',
  EXPIRED_TOKEN: 'Your session has expired. Please log in again.',
  MISSING_TOKEN: 'No authentication token was provided.',
} as const;

export const BAD_REQUEST_ERRORS = {
  // Auth
  INVALID_CREDENTIALS: 'The email or password you entered is incorrect.',
  MISSING_FIELDS: 'Some required fields are missing.',
  INVALID_EMAIL_FORMAT: 'The email address format is not valid.',
  PASSWORD_TOO_SHORT: 'The password must be at least 8 characters long.',
  INVALID_INPUT: 'The input provided is not valid.',
  USER_ALREADY_EXISTS: 'An account with this email address already exists.',

  //   General
  NO_FIELDS_TO_UPDATE: 'No fields were provided to update.',

  // Spaces
  SPACE_ALREADY_EXISTS: 'A space with this name already exists.',

  // Buckets
  BUCKET_ALREADY_EXISTS: 'A bucket with this name already exists.',
} as const;

export const NOT_FOUND_ERRORS = {
  // Spaces
  SPACE_NOT_FOUND: 'The space you are looking for does not exist.',

  // Buckets
  BUCKET_NOT_FOUND: 'The bucket you are looking for does not exist.',

  // Tasks
  TASK_NOT_FOUND: 'The task you are looking for does not exist.',

  // Tags
  TAG_NOT_FOUND: 'The tag you are looking for does not exist.',
} as const;

export const FORBIDDEN_ERRORS = {
  // Spaces
  ACCESS_DENIED: 'You do not have permission to access this resource.',
};
