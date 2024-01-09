import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  // componentDidUpdate = async (prevProps) => {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       isLoading: true,
  //     });
  //     try {
  //       let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin, {
  //         headers: {
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDU5NDBkOGEyMDAwMThhNDhhNWQiLCJpYXQiOjE3MDQ4MDc2OTgsImV4cCI6MTcwNjAxNzI5OH0.6z-CNL1t8RY8aQkY6oVb72Y9BPY1m29k2q1vsZdR4KQ",
  //         },
  //       });
  //       console.log(response);
  //       if (response.ok) {
  //         let comments = await response.json();
  //         this.setState({
  //           comments: comments,
  //           isLoading: false,
  //           isError: false,
  //         });
  //       } else {
  //         this.setState({ isLoading: false, isError: true });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       this.setState({ isLoading: false, isError: true });
  //     }
  //   }
  // };

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.asin, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDU5NDBkOGEyMDAwMThhNDhhNWQiLCJpYXQiOjE3MDQ4MDc2OTgsImV4cCI6MTcwNjAxNzI5OH0.6z-CNL1t8RY8aQkY6oVb72Y9BPY1m29k2q1vsZdR4KQ",
          },
        });
        console.log(response);

        if (response.ok) {
          let comments = await response.json();
          // this.setState({
          //   comments: comments,
          //   isLoading: false,
          //   isError: false,
          // });
          setComments(comments);
          setIsLoading(false);
          setIsError(false);
        } else {
          // this.setState({ isLoading: false, isError: true });
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    };
    if (props.asin) {
      fetchComments();
    }
  }, [props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
