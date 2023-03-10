function kangaroo(x1, v1, x2, v2) {
  // Write your code here

  if(x2 > x1 && v2 > v1) return "NO"
  else if(x2 > x1 && v1 > v2) return "YES"
  else if(x1 > x2 && v1 > v2) return "NO"
  else if(x1 > x2 && v1 < v2) return "YES"
  else {
    return "YES"
  }
}

kangaroo(0,3,4,2)

// x = posição , v = metros por salto