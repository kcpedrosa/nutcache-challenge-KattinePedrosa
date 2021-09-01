import { useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthContext} from '../contexts/auth';


export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}){
  const { signed, loading } = useContext(AuthContext);

  if(loading){
    return(
      <div></div>
    )
  }/*if he is signed, return that div*/ 

  if(!signed && isPrivate) {
    return <Redirect to="/" />
  }/*if user is not signed and the route is private
  user will be redirected*/ 

  if(signed && !isPrivate) {
    return <Redirect to="/dashboard" />
  }/*if he is logged and tries to acc
  private route, he is redirected
  like a logged user trying to acc login screen again*/ 

  return(
    <Route
    {...rest}
    render={props => (
      <Component {...props}/>
    )}
    />
  )
}