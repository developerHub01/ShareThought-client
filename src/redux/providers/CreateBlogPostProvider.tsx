"use client";

import { Provider } from "react-redux";
// import store, { persistor } from "@/redux/store";
import store from "@/redux/store";
import { ReactNode } from "react";
// import { PersistGate } from "redux-persist/integration/react";

interface CreateBlogPostProviderProps {
  children: ReactNode;
}

// const CreateBlogPostProvider = ({ children }: SignUpProviderProps) => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// };
const CreateBlogPostProvider = ({ children }: CreateBlogPostProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default CreateBlogPostProvider;
