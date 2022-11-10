import { NextPage } from "next";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

const NetworkRequestsTestPage: NextPage = () => {
    const [text, setText] = useState<string>("Empty");

    return (
        <>
            <button onClick={
                async () => {
                    let response: AxiosResponse;
                    try {
                        response = await axios.post(
                            "https://api.razorpay.com/v1/orders",
                            {},
                            {
                                withCredentials: true,
                                auth: {
                                    username: "rzp_test_FkTMc27tC2DyPT",
                                    password: "5fz16fyeLaTEW5fVSxDqHIs82"
                                }
                            }
                        );
                    }
                    catch(error) {
                        console.error(error);
                        setText(error.toString());
                        return;
                    }
                    
                    setText(JSON.stringify(response, null, 2));
                }
            }>
                Test
            </button>

            <div className="light_theme">
                {text}
            </div>
        </>
    );
};

export default NetworkRequestsTestPage;