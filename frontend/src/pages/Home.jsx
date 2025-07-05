import changeTitle from "../utils/changeTitle";
import { Link } from 'react-router-dom';

function Home() {

    changeTitle('Home');

    return <main className="flex flex-col items-center">

        <header>
            <div className="flex flex-row gap-4">
                <div className="">
                    <img className="w-50 h-50 mr-2" src="default-person-pfp.jpg" alt="Your Name/Title Here" width={1} height={1} />
                </div>
                <div className="marked">
                    <h1>Your Name</h1>
                    <h2>Your Subtitle</h2>
                    <p>Your text could go here!</p>
                </div>
            </div>
        </header>
    
        <section className="flex flex-col items-center p-5 gap-2">
            <h2 className="text-2xl">Want To Read More?</h2>
            <Link to="/posts" className="w-max bg-red-500 text-white p-2 block">View Posts</Link>
        </section>

    </main>
}

export default Home;