import Link from "next/link";
import styles from "./page.module.css";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tech Dive</title>
        <meta name="description" content="Discover the Future of Tech - Unlock New Possibilities" />
      </Head>

      <main className={styles.main}>
        {/* Background Video */}
        <video
          src="/background.mp4"
          autoPlay
          muted
          loop
          className={styles.video}
        />

        {/* Main Content */}
        <div className={styles.contents}>
          <h1>Discover the Future of Tech<br />Unlock New Possibilities</h1>
          <p>
            A platform and resource designed by students, for students and tech enthusiasts.<br />
            Stay informed with the latest tech news from various sources and dive deeper<br />
            into tech concepts and projects that shape our world and its future.
          </p>

          {/* Buttons */}
          <div className={styles.button}>
            <button>About</button>
            <button>
              <a href="#motive-section">Story</a>
            </button>
          </div>

          {/* Motive Section */}
          <div id="motive-section" className={styles.motive}>
            <h1>The Motive</h1>
            <p>
              TechDive was created during our internship in DC as a platform for students and 
              tech enthusiasts to progressively learn about key concepts in technology. <br />
              We saw the need for a space that not only combines tech news, projects, and educational resources 
              but also serves as a way for us to research and stay current in an ever-evolving field.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <header className={styles.header}>
          <a href="#" className={styles.logo}>TECH DIVE</a>
          <nav className={styles.navbar}>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#resources-section">Resources</a>
            <a href="#">Outlets</a>
          </nav>
        </header>

        {/* Profile Sections */}
        <div className={styles.profileSections}>
          {/* Justin section container */}
          <Link href='/users'>
            <div className={styles.Justin}>
              <div className={styles.imgContainer}>
                <img src="/images/Justin.jpg" width={175} height={175} alt="Justin Duru" />
                <div className={styles.textbox}>
                  <button>View Profile</button>
                </div>
              </div>
            </div>
          </Link>

          {/* Courage section container */}
          <div className={styles.courage}>
            <div className={styles.imgContainer2}>
              <img src="/images/courage.jpg" width={175} height={175} alt="Courage Tikum" />
              <div className={styles.textbox2}>
                <button>View Profile</button>
              </div>
            </div>
          </div>
        </div>

{/* Resources section container */}
<div id="resources-section" className={styles.resources}>
  <h1>Resources</h1>
  <p>sjssjsjsjssjsjsjsxnkxnk</p>
  <div className="flex justify-around items-center">
    {/* Programming Card */}
    <div className="mx-4">
      <div className="card bg-black w-80 h-[400px] shadow-xl border border-transparent hover:border-white hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
        <figure className="px-10 pt-10 h-[250px]">
          <img
            src="images/programming.jpg"
            alt="Programming"
            className="rounded-xl object-cover w-full h-full"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-white">Programming</h2>
          <div className="card-actions animate-fadeIn">
            <button className="btn btn-primary hover:bg-white hover:scale-105 transform transition-transform duration-300">
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Cybersecurity Card */}
    <div className="mx-4">
      <div className="card bg-black w-80 h-[400px] shadow-xl border border-transparent hover:border-white hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
        <figure className="px-10 pt-10 h-[250px]">
          <img
            src="images/cyber.jpg"
            alt="Cybersecurity"
            className="rounded-xl object-cover w-full h-full"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-white">Cybersecurity</h2>
          <div className="card-actions">
            <button className="btn btn-primary hover:bg-blue-500 hover:scale-105 transform transition-transform duration-300">
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* News Outlets Card */}
    <div className="mx-4">
      <div className="card bg-black w-80 h-[400px] shadow-xl border border-transparent hover:border-white hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
        <figure className="px-10 pt-10 h-[250px]">
          <img
            src="images/news.jpg"
            alt="News Outlets"
            className="rounded-xl object-cover w-full h-full"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-white">News Outlets</h2>
          <div className="card-actions">
            <button className="btn btn-primary hover:bg-blue-500 hover:scale-105 transform transition-transform duration-300">
               Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      </main>
    </>
  );
}
