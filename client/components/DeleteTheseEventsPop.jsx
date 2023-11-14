import React, { Fragment } from 'react'

function DeleteTheseEventsPop({ eventsToBeDeletedArr, removeToBeDeltedItem }) {
  return (
    <>
      {eventsToBeDeletedArr.length > 0 && (
        <div>
          Delete the following events?
          {eventsToBeDeletedArr.map((x) => {
            return (
              <Fragment key={x.id}>
                <div>
                  {x.title} at {x.start.toDateString()}{' '}
                  <button onClick={() => removeToBeDeltedItem(x)}>X</button>
                </div>
              </Fragment>
            )
          })}
        </div>
      )}
    </>
  )
}

export default DeleteTheseEventsPop
