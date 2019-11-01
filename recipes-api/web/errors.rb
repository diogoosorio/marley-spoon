# frozen_string_literal: true

module Errors
  def self.not_found
    { code: '10001', message: 'Not found' }
  end

  def self.internal_error
    { code: '10002', message: 'Internal server error' }
  end

  def self.invalid_request(validation)
    {
      code: '10003',
      message: 'Invalid request parameters',
      errors: validation.full_messages
    }
  end

  def self.service_unavailable
    { code: '10004', message: 'Service unavailable' }
  end
end
