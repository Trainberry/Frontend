import { writable } from 'svelte/store';
import axios from 'axios';

export const revokeMessage = writable({
    color: "green",
    message: ""
});

export const createTokenMessage = writable({
    color: "green",
    message: ""
});

export const validateTokenMessage = writable({
    color: "green",
    message: ""
});

const host = 'https://mail-api.edu.forestier.re' //TODO variabilze!

export function createToken(email) {
    axios.post(`${host}/tokens`, {"email": email})
        .then(() => {
            createTokenMessage.set(
                {
                    color: "green",
                    message: "La validation est en attente. Consultez votre boîte mail."
                }
            )
        })
        .catch(err => {
            createTokenMessage.set(
                {
                    color: "red",
                    message: "Une erreur est survenue lors de la création :" + err.data
                }
            )
        })
}

export function validateToken(email, token) {
    axios.post(`${host}/validate`, {"email": email, "token": token})
        .then(() => {
            validateTokenMessage.set(
                {
                    color: "green",
                    message: "Le token a été créé. Consultez votre boîte mail."
                }
            )
        })
        .catch(err => {
            validateTokenMessage.set(
                {
                    color: "red",
                    message: "Une erreur est survenue lors de la création :" + err.data
                }
            )
        })
}


export function revoke(token) {
    axios.delete(`${host}/tokens`, {headers: {Authorization: token}})
        .then(() => {
            revokeMessage.set(
                {
                    color: "green",
                    message: "Le token a bien été révoqué."
                }
            )
        })
        .catch(err => {
            revokeMessage.set(
                {
                    color: "red",
                    message: "Une erreur est survenue lors de la révocation :" + err.data
                }
            )
        })
}