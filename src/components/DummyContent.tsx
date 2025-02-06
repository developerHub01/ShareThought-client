import React from "react";

const DummyContent = () => {
  return (
    <section className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">
        Heading of the Section
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        This is a longer description of the section. The content here can go on
        for multiple paragraphs, providing detailed information or context about
        the topic at hand. You can include all sorts of text, such as
        explanations, historical context, or anything that provides value to the
        reader. For example, this paragraph might explain what this dummy
        section is about or describe how the design works.
        <br />
        <br />
        You can also add further elaboration, expanding on the features or
        discussing the specifics of the application or concept being introduced.
        This allows for greater flexibility in your content and can help guide
        the reader through a more complex topic. Additionally, the text will
        wrap naturally depending on the container size, ensuring a smooth
        reading experience on all screen sizes.
        <br />
        <br />
        Feel free to adjust the content length as needed for different
        scenarios.
      </p>
      {/* Optional Button */}
      <div className="flex justify-start">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Action Button
        </button>
      </div>
    </section>
  );
};

export default DummyContent;
