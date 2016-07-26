'use strict';

const directions = ['east', 'west', 'north', 'south']

function Robot() {
//  Robots are placed on a hypothetical infinite grid,
//facing a particular direction (north, east, south, or west)
// at a set of {x,y} coordinates
  this.x = 0
  this.y = 0
  this.bearing = 'north'
  this.coordinates = [this.x, this.y]


  Robot.prototype.orient = function (bearing) {
    if (directions.includes(bearing)) {
      this.bearing = bearing
    } else {
      throw new Error("Invalid Robot Bearing")
    }
  }

  Robot.prototype.turnLeft = function () {
    if (this.bearing === 'west') {
      this.orient('south')
    } else if (this.bearing === 'north') {
      this.orient('west')
    } else if (this.bearing === 'east') {
      this.orient('north')
    } else if (this.bearing === 'south') {
      this.orient('east')
    }
  }

  Robot.prototype.turnRight = function () {
    if (this.bearing === 'north') {
      this.orient('east')
    } else if (this.bearing === 'east') {
      this.orient('south')
    } else if (this.bearing === 'south') {
      this.orient('west')
    }
    else if (this.bearing === 'west') {
      this.orient('north')
    }
  }

  Robot.prototype.at = function (x, y) {
    this.x = x
    this.y = y
    this.coordinates = [this.x, this.y]
    return this.coordinates
  }

  Robot.prototype.advance = function () {
    var currentDirection = this.bearing
    if (currentDirection === 'east') {
      this.x += 1
      this.coordinates = [this.x, this.y]
      return this.coordinates
    } else if (currentDirection === 'west'){
      this.x -= 1
      this.coordinates = [this.x, this.y]
      return this.coordinates
    } else if (currentDirection === 'north') {
      this.y += 1
      this.coordinates = [this.x, this.y]
      return this.coordinates
    } else if (currentDirection === 'south') {
      this.y -= 1
      this.coordinates = [this.x, this.y]
      return this.coordinates
    }
  }

  Robot.prototype.instructions = function (instructions) {
    var instructionsList = instructions.split("")
    var updatedInstructions = instructionsList.map(function (directions) {
      if (directions === "R") {
        return "turnRight"
      } else if (directions === "L") {
        return "turnLeft"
      } else if (directions === "A") {
        return "advance"
      }
    })
    return updatedInstructions
  }

  Robot.prototype.place = function ({x: x, y: y, direction: direction}) {
    this.x = x
    this.y = y
    this.coordinates = [this.x, this.y]
    this.bearing = direction
  }

  Robot.prototype.evaluate = function (list) {
    var evalList = this.instructions(list)
    evalList.forEach((dir) => {
      if (dir === "turnLeft") {
        this.turnLeft()
      } else if (dir === "turnRight") {
        this.turnRight()
      } else if (dir === "advance") {
        this.advance()
      }
    })
  }

  // implement your solution here!
}
