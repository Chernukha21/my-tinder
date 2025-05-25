import {Spinner} from "@heroui/spinner";

const Loading = () => {
    return (
        <div className="flex justify-center items-center vertical-center">
            <Spinner className="text-transparent px-4 py-2" label="loading" variant="gradient" />
        </div>
    )
};

export default Loading;