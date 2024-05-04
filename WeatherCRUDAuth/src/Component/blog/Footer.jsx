import React from 'react'
import './blog.css';

const Footer = () => {
  return (
    <div>
        <footer>
        <div className="social-links">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-pinterest"></i></a>
        </div>
        <span>Kingo's Blog</span>
      </footer>
    </div>

  )
}

export default Footer