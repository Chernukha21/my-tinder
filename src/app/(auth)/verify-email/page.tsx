import {verifyEmail} from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import {MdOutlineMailOutline} from "react-icons/md";
import LoadingComponent from "@/components/LoadingComponent";
import ResultMessage from "@/components/ResultMessage";

const Page = async ({searchParams}: { searchParams: Promise<{ token: string }> }) => {
    const {token} = await searchParams;
    const result = await verifyEmail(token);

    return (
        <CardWrapper
            headerText="Verify your email address"
            headerIcon={MdOutlineMailOutline}
            body={
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex flex-row items-center">
                        <div>
                            <span>Verifying your email</span>
                            {!result && <LoadingComponent/>}
                        </div>
                    </div>
                </div>
            }
            footer={<ResultMessage result={result}/>}
        />
    );
};

export default Page;