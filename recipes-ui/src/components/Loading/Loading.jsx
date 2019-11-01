import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import { InternalError } from '../ErrorPages'
import './Loading.css'

const withLoading = Component => ({ loading, error, ...extraProps }) => {
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <InternalError />
  }

  return <Component {...extraProps} />
}

const Loading = ({ tip }) => (
  <div className="loading">
    <Spin tip={tip} />
  </div>
)

Loading.propTypes = {
  tip: PropTypes.string
}

Loading.defaultProps = {
  tip: 'Loading...'
}

export default withLoading