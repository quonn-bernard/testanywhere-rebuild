class InputValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "InputValidationError"; 
    }
  }

  class ResourceRetrievalError extends Error {
    constructor(message) {
      super(message);
      this.name = "ResourceRetrievaError"; 
    }
  }

  class ResourceCreationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ResourceRetrievaError"; 
    }
  }

  class ResourceUpdateError extends Error {
    constructor(message) {
      super(message);
      this.name = "ResourceRetrievaError"; 
    }
  }

  class ResourceDeletionError extends Error {
    constructor(message) {
      super(message);
      this.name = "ResourceRetrievaError"; 
    }
  }

export {
    InputValidationError,
    ResourceRetrievalError,
    ResourceCreationError,
    ResourceUpdateError,
    ResourceDeletionError
}
