import React from 'react'

const LoginButton = (props: any) => {
  return <div>login...</div>
}
const Logouteutton = (props: any) => {
  return <div>logout...</div>
}
const getuserId = () => {
  return true
}
const withLoginAndLogout = (ComponentForLogin: any, ComponentForLogout: any) => {
  const NewComponent = (props: JSX.IntrinsicAttributes) => {
    if (getuserId()) {
      return <ComponentForLogin {...props} />
    }
    return <ComponentForLogout {...props} />
  }
  return NewComponent
}
const TopButtons = withLoginAndLogout(Logouteutton, LoginButton)

export default TopButtons
