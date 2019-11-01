import React from 'react'
import PropTypes from 'prop-types'

const ErrorPage = ({ title, description }) => (
  <>
    <h1>{title}</h1>
    <p>{description}</p>
  </>
)

const InternalError = () => (
  <ErrorPage
    title="Internal Error"
    description="We found a problem processing your request. Please refresh to try again." />
)

const NotFoundError = () => (
  <ErrorPage
    title="Page Not Found"
    description="The page you&apos;re trying to reach doesn&apos;t appear to exist" />
)

ErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export { InternalError, NotFoundError, ErrorPage }