import React, { Fragment } from 'react'

function DeleteTheseEventsPop({ eventsToBeDeletedArr }) {
  // console.log(eventsToBeDeletedArr)
  return (
    <>
      {eventsToBeDeletedArr.length > 0 && (
        <div>
          Delete the follow events?
          {eventsToBeDeletedArr.map((x) => {
            return (
              <Fragment key={x.id}>
                <div>
                  {x.title} at {x.start.toDateString()}{' '}
                </div>
              </Fragment>
            )
          })}
        </div>
      )}
      {/* <button onClick={deleteConfirmPop}>delete events</button> */}
    </>
  )
}

export default DeleteTheseEventsPop
