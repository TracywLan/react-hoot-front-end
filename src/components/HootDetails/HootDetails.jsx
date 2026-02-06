import { useParams, Link } from "react-router"
import { useState, useEffect, useContext } from "react";
import * as hootService from '../../services/hootService'
import CommentForm from "../CommentForm/CommentForm";
import { UserContext } from "../../contexts/UserContext";

const HootDetails = (props) => {
    const { hootId } = useParams();
    // Access the user object from the UserContext
    const { user } = useContext(UserContext);
    const [hoot, setHoot] = useState(null);
    // Track which comment ID is in "Edit Mode" (null means nobody is editing)
    const [editCommentId, setEditCommentId] = useState(null);
    // Track the text being typed in the edit box
    const [editText, setEditText] = useState('')

    useEffect(() => {
        const fetchHoot = async () => {
            const hootData = await hootService.show(hootId);
            setHoot(hootData);
        };
        fetchHoot();
    }, [hootId]);

    const handleAddComment = async (commentFormData) => {
        const newComment = await hootService.createComment(hootId, commentFormData);
        setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
    }

    const handleDeleteComment = async (commentId) => {
        await hootService.deleteComment(hootId, commentId);
        setHoot({
            ...hoot,
            comments: hoot.comments.filter((comment) => comment._id !== commentId),
            });
    }

    // 1. Turn on Edit Mode
    const handleEditClick = (comment) => {
        setEditCommentId(comment._id);
        setEditText(comment.text); // Pre-fill the box with current text
    }

    // 2. Turn off Edit Mode (Cancel)
    const handleCancelEdit = () => {
        setEditCommentId(null);
        setEditText('');
    }

    // 3. Save Changes
    const handleUpdateComment = async (commentId) => {
        // Call the service (ensure you added updateComment to hootService.js)
        await hootService.updateComment(hootId, commentId, { text: editText });

        // Update the screen immediately (Optimistic UI)
        const updatedComment = hoot.comments.map((comment) => 
            comment._id === commentId ? {...comment, text: editText} : comment
        );

        setHoot({...hoot, comments: updatedComment});

        // Close the edit box
        setEditCommentId(null)
    }
    

    if (!hoot) return <main>Loading...</main>;
    if (hoot.err || !hoot.category) {
        return (
            <main>
                <h1>Hoot not found</h1>
                <p>The hoot you are looking for does not exist.</p>
            </main>
        );
    }

    return (
    <main>
        <section>
            <header>
                <p>{hoot.category.toUpperCase()}</p>
                <h1>{hoot.title}</h1>
                <p>
                    {`${hoot.author.username} posted on
                    ${new Date(hoot.createdAt).toLocaleDateString()}`}
                </p>
                {hoot.author._id === user._id && (
                    <>  
                        {/* new edit route */}
                        <Link to={`/hoots/${hootId}/edit`}>Edit</Link> 
                        <button onClick={()=>props.handleDeleteHoot(hootId)}>  
                            {/* hootId will tell the function which hoot to delete */}
                            Delete
                        </button>
                    </>
                )}
            </header>
            <p>{hoot.text}</p>
        </section>
        <section>
            <h2>Comments</h2>
            <CommentForm handleAddComment={handleAddComment}/>

            {!hoot.comments.length && <p>There are no comments.</p> }

            {hoot.comments.map((comment)=>(
                <article key={comment._id}>
                    {/* LOGIC: Is this specific comment being edited? */}
                     {editCommentId === comment._id ? (
                        // --- OPTION A: SHOW EDIT FORM ---
                        <div>
                            <textarea value={editText} onChange={(e) => setEditText(e.target.value)} required />
                            <button onClick={()=>{handleUpdateComment(comment._id)}}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                     ) :(
                        // --- OPTION B: SHOW REGULAR COMMENT ---
                        <>
                            <header>
                                <p>
                                    {`${comment.author.username} posted on 
                                    ${new Date(comment.createdAt).toLocaleDateString()}`}
                                </p>
                                {comment.author._id === user._id && (
                                    <>
                                        <button onClick={() => {
                                            handleEditClick(comment)
                                        }}>Edit</button>

                                        <button onClick={() => handleDeleteComment(comment._id)}>
                                        Delete
                                        </button>
                                    </>
                                    )}
                            </header>
                            <p>{comment.text}</p>
                        </>
                    )}
                </article>
            ))}
        </section>
    </main>
  );
}

export default HootDetails