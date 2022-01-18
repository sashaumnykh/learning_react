import React, { Component } from 'react'

export class CurrentUserStore extends Component {
    currentUser;
    isAuthorised;

    logIn(login, password) {
        return api.call("/api/users/login", api.POST({login, password}))
        .then(
            response => {
                this.isAuthorised = true;
                return this.setCirrentUser(responce.user);
            },
            err => {
                return this.handleError(err);
            }
        )

    }

    setCurrentUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
        SegmentAnalytics.identifyUser(user.id, { email: user.email });
        this.currentUser = user;
        return {
          success: true,
          errorMessage: null
        };
      }

    handleError(err) {
        this.currentUser = null;
        return {
          success: false,
          errorMessage: getErrorMessage(err, "Error in authentication")
        };
      }
}

export const api = {
    JSON_HEADERS,
    FORM_HEADERS,
    GET,
    POST,
    PUT,
    DELETE,
    call: (url, headers = GET()) =>
      fetch(url, headers).then(handleResponse, handleError)
  };
