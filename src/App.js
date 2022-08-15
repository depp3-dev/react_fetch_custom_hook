import { useState, useEffect } from "react";
import { Loader } from "./components/Loader/Loader";
import { Message } from "./components/Message/Message";
import { helpHttp } from "./helpers/helpHttp"

const App = () => {
    const [db, setDb] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const URL = "http://localhost:8090/product";
    const api = helpHttp();

    useEffect(() => {
        api.get(URL).then(res => {
            if (!res.err) {
                setDb(res);
                setError(null);
            } else {
                setDb(null);
                setError(res);
            }
            setLoading(false);
        });

    }, [])


    return (
        <>
            { loading && <Loader /> }
            { error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#DC3545" /> }
            { db !== null && db.map( (el) => {
                return (
                    <div key={el.id}>
                        <h4>{el.name}</h4>
                    </div>
                )
            } )}
        </>
    );
}

export default App;
