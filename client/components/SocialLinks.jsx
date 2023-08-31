import React from 'react'

export default function SocialLinks({ link, name }) {
  return (
    <>
      {link && (
        <li>
          <a href={'https://' + link} target="_blank" rel="noreferrer noopener">
            <img src={name + '.webp'} alt={name}></img>
            {/* {link} */}
          </a>
        </li>
      )}
    </>
  )
}
