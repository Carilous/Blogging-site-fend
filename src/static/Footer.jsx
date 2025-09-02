import global from '../assets/global.png';
import sustain from '../assets/sustain.png';
import circular from '../assets/circular.png';
import arrow from '../assets/arrow.png';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Footer = () => {
    const { pathname } = useLocation();

  // Hide footer on the following pages 
  if (pathname === "/signup "|| pathname === "/login" ||   pathname === "/create" || pathname=== "/edit/:id"|| pathname === "/posts/:id"
    || pathname === "/posts" || pathname === "/user/:id"  || pathname === "/users"|| pathname === "/users/:id"
|| pathname === "/users"|| pathname === "/users/:id" || pathname === "/posts/:id" || pathname === "/posts/:id/edit"
    
  )  {
    return null;
  }
    return(
        <div>
              <section className="py-16 bg-gradient-to-r from-[#bfd2c5] to-[#fafdfa] text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Building Tomorrow's Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how technology, sustainability, and innovation converge 
              to create positive impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              
              </div>
              <div className="bg-white py-8 shadow-lg rounded-md" >
                <img src={sustain} alt="Impact" className="w-16 h-16 mx-auto mb-4 rounded-3xl" />
                
              <h3 className="text-xl font-semibold mb-2">Sustainable Tech</h3>
              <p className="text-muted-foreground">
                Exploring technologies that minimize environmental impact while maximizing positive outcomes.
              </p>
              </div>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              
              </div>
              <div className=" bg-white shadow-lg rounded-md py-10">
                 <img src={global} alt="Impact" className="w-16 h-16 mx-auto mb-4" />

              <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
              
              <p className="text-muted-foreground">
                Stories and solutions that create ripple effects of positive change across communities.
              </p>
              </div>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                
              </div>
              <div className="bg-white  py-10 shadow-lg rounded-md">
                 <img src={circular} alt="Impact" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Circular Economy</h3>
              <p className="text-muted-foreground">
                Innovations in regenerative business models and circular design thinking.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Latest Posts  */}
<section className="py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center mb-12">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
        <p className="text-lg text-muted-foreground">
          Fresh insights and perspectives from our community
        </p>
      </div>

    <Link to ="/posts" >
      <h1 className='flex flex-row  justify-center items-center'>  View All Posts <span>   <img src={arrow} alt="arrow" className="w-10 h-10 mx-auto mb-4" /></span></h1>
         
            
          </Link>
          
    </div>

    {/* Static  posts */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {[
        {
          _id: "1",
          title: "Mastering React in 2025",
          excerpt:
            "A complete guide to the latest trends in React development.",
          image: "https://via.placeholder.com/400x250",
          author: "Carilous owuor",
          date: "Aug 12, 2025",
        },
        {
          _id: "2",
          title: "Understanding Tailwind CSS",
          excerpt:
            "How to rapidly build beautiful, responsive UI components.",
          image: "https://via.placeholder.com/400x250",
          author: "John Smith",
          date: "Aug 10, 2025",
        },
        {
          _id: "3",
          title: "JavaScript Best Practices",
          excerpt:
            "Improve code quality and maintainability with these tips.",
          image: "https://via.placeholder.com/400x250",
          author: "Alex Lee",
          date: "Aug 8, 2025",
        },
      ].map((post, index) => (
        <div
          key={post._id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          
        </div>
      ))}
    </div>

    
  </div>
</section>

        </div>
    )
}
export default Footer;