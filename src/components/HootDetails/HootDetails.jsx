import { useParams } from "react-router"
import { useState, useEffect, useContext } from "react";
import * as hootService from '../../services/hootService'
import CommentForm from "../CommentForm/CommentForm";
import { UserContext } from "../../contexts/UserContext";

const HootDetails = (props) => {
    const { hootId } = useParams();
    // Access the user object from the UserContext
    const { user } = useContext(UserContext);
    const [hoot, setHoot] = useState(null);

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
                    <header>
                        <p>
                            {`${comment.author.username} posted on 
                            ${new Date(comment.createdAt).toLocaleDateString()}`}
                        </p>
                    </header>
                    <p>{comment.text}</p>
                </article>
            ))}
        </section>
    </main>
  );
}

export default HootDetails