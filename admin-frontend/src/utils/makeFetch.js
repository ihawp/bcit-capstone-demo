async function makeFetch() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        });

        if (!response.ok) throw new Error();

        const data = await response.json();

        if (!data.success) throw new Error();

        return data.data;
    } catch (error) {
        return false;
    }
}

export default makeFetch;