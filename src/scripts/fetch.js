const Fetch = (function () {
    let loading = false;
    let error = false;
    const urls = {
        jsonPlaceholder: "https://jsonplaceholder.typicode.com", //http://localhost:3001
        chatGPT: "https://api.openai.com",
    };

    const request = async ({ url, method = "GET", data = {}, headers = {}, cb = () => {} }) => {
        loading = true;
        try {
            const response = await axios({
                url,
                method,
                headers,
                data,
                // withCredentials: true,
            });

            loading = false;

            cb(null, response.data);
            return response.data;
        } catch (err) {
            if (!err.response) return console.log(err);
            // if (!err.response) return (window.location.pathname = "/connection-error");

            loading = false;
            error = true;

            cb(err.response.data, null);
            throw err.response.data;
        }
    };

    const getProducts = async (cb) => {
        const url = urls.jsonPlaceholder + "/photos?_limit=10";
        return await request({ url, method: "GET", cb });
    };
    const getProduct = async (cb, id) => {
        const url = urls.jsonPlaceholder + `/photos/${id}`;
        return await request({ url, method: "GET", cb });
    };

    const getUsers = async (cb) => {
        const url = urls.jsonPlaceholder + "/users";
        return await request({ url, method: "GET", cb });
    };

    const getPhotos = async (cb) => {
        const url = urls.jsonPlaceholder + "/photos?_limit=134";
        return await request({ url, method: "GET", cb });
    };

    const getChatGPTMessage = async (cb, apiMessages) => {
        const url = urls.chatGPT + "/v1/chat/completions";
        const headers = {
            Authorization: "Bearer " + "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",
            "Content-Type": "application/json",
        };

        const systemMessage = {
            role: "system",
            //  Explain things like you're talking to a software professional with 5 years of experience.
            // content: "Explain things like you're talking to a software professional with 2 years of experience.",
            content: `Your name is Ted.
                 you are assistant in the website and you provide visitors the inforamtion about the website content,
                 advertising the calculators (AI 9x9 Go Game - WeiQi, Pythagorean Theorem Calculator,
                 Ohm's Law Calculator, Percentage Calculator,Simple To Do Checklist).
                 Calculators available in google play. maximum assistent content length sould be 150 chatacters for each message, keep content short.
                 Be friendly and make short jokes. Display symbols and emojis in conversation.
                 when visitors trying to leave say something like 'May the Force be with you'.`,
        };
        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                systemMessage, // The system message DEFINES the logic of our chatGPT
                ...apiMessages, // The messages from our chat with ChatGPT
            ],
        };
        return await request({ url, method: "POST", data: apiRequestBody, headers, cb });
    };

    return { request, loading, getPhotos, getUsers, error, getProducts, getProduct, getChatGPTMessage };
})();
