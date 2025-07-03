async function makeFetch(url, options) {
    try {
        const response = await fetch(url, options);

        console.log(response);

        if (!response.ok) throw new Error();

        const data = await response.json();

        if (!data.success) throw new Error();

        return data.data;
    } catch (error) {
        return false;
    }
}

export default makeFetch;