// import '../assets/styles/footer.css'

export default {
  data() {
    return {
      author: '你Ai大爷'
    }
  },
  render() {
    return (
      <div id="footer" class="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}