export const myHeaderGet={
    method:"GET",
    headers:{
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth_token")
    }
}

export const myHeaderPost={
    method:"POST",
    headers:{
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("auth_token")
    }
}
