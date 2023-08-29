import React from 'react'

export default function SocialLinks({ link, name }) {
  return (
    <>
      {link && (
        <li>
          <a href={link}>
            <img src={name + '.webp'} alt={name}></img>
            {/* {link} */}
          </a>
        </li>
      )}
    </>
  )
}
