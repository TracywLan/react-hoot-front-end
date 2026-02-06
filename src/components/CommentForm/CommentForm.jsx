import { useState } from "react";


const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text:'' })

    const handleChange = (evt) => {
        setFormData({...formData, [evt.target.name]:evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddComment(formData); //call handleAddComment thats been passed down
        setFormData({ text:'' }); //reset formdata after submit
    };

    return (
    <form onSubmit={handleSubmit}>
        <label htmlFor='text-input'>Your comment:</label>
        <textarea
            required
            type='text'
            name='text'
            id='text-input'
            value={formData.text}
            onChange={handleChange}
        />
        <button type='submit'>SUBMIT COMMENT</button>
    </form>
    );
}

export default CommentForm;