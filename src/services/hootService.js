
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/hoots`;

const index = async () => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(BASE_URL, {
            headers: {'Authorization': `Bearer ${token}`},
            // The headers property is an object containing any headers that must be sent along with the request
            // need auth header because our routes are protected by verifyToken
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}
const show = async (hootId) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async (HootForm) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(HootForm)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const createComment = async (hootId, commentFormData) => {
    try {
    const res = await fetch(`${BASE_URL}/${hootId}/comments`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
    });
    return res.json();
    } catch (error) {
        console.log(error);
    }
}

const deleteHoot = async (hootId) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

async function update(hootId, hootFormData) {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hootFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

// DELETE a comment
const deleteComment = async (hootId, commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// UPDATE a comment
const updateComment = async (hootId, commentId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export {
    index, show, create, createComment, deleteHoot, update, deleteComment, updateComment
}
