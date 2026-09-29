"use server"
import VerifyEmail from '../_components/verifiedEmail';

const verifiedPage = async() => {
    return (
        <div>
            <VerifyEmail></VerifyEmail>
        </div>
    );
};

export default verifiedPage;