class InvalidCredentialsError extends Error {
    constructor(message) {
      super(message);
      this.name = "InvalidCredentialsError"; 
    }
  }

  class PasswordResetRequestException extends Error {
    constructor(message) {
      super(message);
      this.name = "PasswordResetRequestException"; 
    }
  }

  class ExpiredPasswordResetRequestException extends Error {
    constructor(message) {
      super(message);
      this.name = "ExpiredPasswordResetRequestException"; 
    }
  }

  class PasswordResetException extends Error {
    constructor(message) {
      super(message);
      this.name = "PasswordResetException"; 
    }
  }

  class DuplicateEmailRegistrationException extends Error {
    constructor(message) {
      super(message);
      this.name = "DuplicateEmailRegistrationException"; 
    }
  }

  export {
    InvalidCredentialsError,
    PasswordResetRequestException,
    ExpiredPasswordResetRequestException,
    PasswordResetException,
    DuplicateEmailRegistrationException
  }