import styles from './CommentForm.module.css';
import Icon from '../Icon/Icon';

const CommentForm = (props) => {

    const handleChange = (evt) => {
        // evt.preventDefault();
        // setFormData({...formData, [evt.target.name]:evt.target.value });
        // Tell the parent to update the text
        props.setText(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // props.handleAddComment(formData); //call handleAddComment thats been passed down
        // setFormData({ text:'' }); //reset formdata after submit
        // We just pass the text back up to whichever function was passed in
        props.handleSubmit({ text: props.text });
    };

    return (
    <main className={styles.container}>
        <form onSubmit={handleSubmit}>
            <label htmlFor='text-input'>Your comment:</label>
            <textarea
                required
                type='text'
                name='text'
                id='text-input'
                value={props.text}
                onChange={handleChange}
            />
            <button type='submit'>
                {/* {props.isEditing? 'Update Comment' : 'Add Comment'} */}
                 <Icon category='Create' />
            </button>
        </form>
    </main>
    );
}

export default CommentForm;