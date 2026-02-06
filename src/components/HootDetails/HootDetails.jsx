import { useParams, Link } from "react-router"
import { useState, useEffect, useContext } from "react";
import * as hootService from '../../services/hootService'
import CommentForm from "../CommentForm/CommentForm";
import { UserContext } from "../../contexts/UserContext";
import styles from './HootDetails.module.css';
import Loading from '../Loading/Loading';
import Icon from '../Icon/Icon';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';

const HootDetails = (props) => {
    const { hootId } = useParams();
    const { user } = useContext(UserContext); // Needed to check ownership
    const [hoot, setHoot] = useState(null);

    // STATE FOR EDITING
    const [text, setText] = useState(''); // Controls the form text
    const [editCommentId, setEditCommentId] = useState(null); // Tracks who is being edited

    useEffect(() => {
        const fetchHoot = async () => {
            const hootData = await hootService.show(hootId);
            setHoot(hootData);
        };
        fetchHoot();
    }, [hootId]);

    // --- HELPER FUNCTIONS ---
    const handleAddComment = async (commentFormData) => {
        const newComment = await hootService.createComment(hootId, commentFormData);
        setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
        setText(''); // Clear Form
    }

    const handleUpdateComment = async (commentFormData) => {
        await hootService.updateComment(hootId, editCommentId, commentFormData);
        
        // Update the list with the new text
        const updatedComments = hoot.comments.map((c) => 
            c._id === editCommentId ? { ...c, text: commentFormData.text } : c
        );
        setHoot({ ...hoot, comments: updatedComments });
        
        // Reset everything
        setText('');
        setEditCommentId(null);
    };

    const handleEditClick = (comment) => {
        setText(comment.text);       // Move text to the top form
        setEditCommentId(comment._id); // Hide it from the list & switch mode
    };

    const handleCancelEdit = () => {
        setText('');
        setEditCommentId(null); // Bring the comment back to the list
    };
    
    const handleDeleteComment = async (commentId) => {
        await hootService.deleteComment(hootId, commentId);
        setHoot({
            ...hoot,
            comments: hoot.comments.filter((c) => c._id !== commentId),
        });
    };

    

    if (!hoot) return <Loading />
    if (hoot.err || !hoot.category) {
        return (
            <main>
                <h1>Hoot not found</h1>
                <p>The hoot you are looking for does not exist.</p>
            </main>
        );
    }

    return (
    <main className={styles.container}>
        <section>
            <header>
                <p>{hoot.category.toUpperCase()}</p>
                <h1>{hoot.title}</h1>
                <div>
                    <AuthorInfo content={hoot} />
                    {hoot.author._id === user._id && (
                    <>  
                        <Link to={`/hoots/${hootId}/edit`}>
                            <Icon category='Edit' />
                        </Link> 
                        <button onClick={()=>props.handleDeleteHoot(hootId)}>  
                            {/* hootId will tell the function which hoot to delete */}
                            <Icon category='Trash' />
                        </button>
                    </>
                )}
                </div>
            </header>
            <p>{hoot.text}</p>
        </section>

        <section>
            <h2>Comments</h2>
                <div>
                    {/* PASS THE STATE AND BOTH FUNCTIONS DOWN */}
                    <CommentForm 
                        text={text} 
                        setText={setText}
                        isEditing={!!editCommentId} // Converts ID to boolean (true/false)
                        handleSubmit={editCommentId ? handleUpdateComment : handleAddComment}
                        handleCancelEdit={handleCancelEdit}  
                    />
                </div>
                {hoot.comments.map((comment) => {
                    if (comment._id === editCommentId) return null; // check to hide the comment when editing
                    return (
                    <article key={comment._id}>
                        <header>
                            <div>
                                <AuthorInfo content={comment} />
                                {comment.author._id === user._id && (
                                    <>
                                        <button onClick={() => handleEditClick(comment)}>
                                            <Icon category='Edit' />
                                        </button>
                                        <button onClick={() => handleDeleteComment(comment._id)}>
                                            <Icon category='Trash' />
                                        </button>
                                    </>
                                )}
                            </div>
                        </header>
                        <p>{comment.text}</p>
                    </article>
                );
            })}
        </section>
    </main>
  );
}

export default HootDetails