import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Collection() {
    const { id } = useParams();
    const collections = useSelector(state => state.collections);
    return (
        <div>
            { collections.length && collections.find(el => el.id === id) }
        </div>
    ) 
}