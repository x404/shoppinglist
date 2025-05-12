import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

interface Props {
    onAdd: (categoryId?: string) => void;
}

const TopAllHeaderBlock = ({ onAdd }: Props) => (
    <div className="d-flex align-items-center flex-grow-1">
        <h3 className="h5 mb-0 me-2" id="my-list-title">My List</h3>
        <Button variant="light" size="sm" onClick={() => onAdd()}>
            <Plus size={16} />
            <span className="text-nowrap">Add product</span>
        </Button>
    </div>
);

export default TopAllHeaderBlock;