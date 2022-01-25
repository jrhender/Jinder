import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
  {
    name: 'Chef John',
    url: './img/pie-john.jpeg'
  },
  {
    name: 'Nature John',
    url: './img/nature-john.jpeg'
  },
  {
    name: 'Jazzy John',
    url: './img/jazz-john.jpeg'
  },
  {
    name: 'Jolly Old John',
    url: './img/british-john.jpeg'
  }
]

function Advanced (props: { onSwipeRight: any}) {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val: any) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction: any, nameToDelete: any, index: any) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    if (direction === 'right') {
      props.onSwipeRight();
    }
  }

  const outOfFrame = (name: any, idx: any) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    // @ts-ignore
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir: any) => {
    if (canSwipe && currentIndex < db.length) {
      // @ts-ignore
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    // @ts-ignore
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>Jinder 2.0</h1>
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            // @ts-ignore
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className='card'
            >
              <h3>{character.name}, 29</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={!canSwipe ? { backgroundColor: '#c3c4d3' }: {}} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={!canGoBack ? { backgroundColor:'#c3c4d3' }: {}} onClick={() => goBack()}>Undo swipe!</button>
        <button style={!canSwipe ? { backgroundColor: '#c3c4d3' }: {}} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
        </h2>
      )}
    </div>
  )
}

export default Advanced