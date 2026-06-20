import React, { useEffect, useMemo, useState } from 'react';
import groupImage from '../assets/Group.jpeg';

const LOCAL_BLOG_IMAGES = {
  'group.jpeg': groupImage,
};

const formatDisplayDate = (value) => {
  if (!value) {
    return '';
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const renderParagraphs = (text) => {
  if (!text) {
    return null;
  }

  return text
    .split(/\n{2,}|\r\n{2,}/)
    .map((block, index) => (
      <p key={`blog-paragraph-${index}`}>{block.trim()}</p>
    ));
};

const resolveBlogImageSrc = (value) => {
  if (!value) {
    return '';
  }

  const normalized = String(value).trim().toLowerCase();
  return LOCAL_BLOG_IMAGES[normalized] || value;
};

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBlogId, setSelectedBlogId] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${apiBaseUrl}/api/blogs`);

        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }

        const data = await response.json();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        setError('Unable to load blog posts right now.');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredBlogs = useMemo(() => {
    if (!normalizedSearch) {
      return blogs;
    }

    return blogs.filter((blog) =>
      [blog.title, blog.excerpt, blog.author, ...(blog.tags || [])]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedSearch))
    );
  }, [blogs, normalizedSearch]);

  const selectedBlog = useMemo(
    () => blogs.find((blog) => blog._id === selectedBlogId) || null,
    [blogs, selectedBlogId]
  );

  if (loading) {
    return (
      <div className="page blog-page">
        <h1>MILES Blog</h1>
        <p className="blog-empty-state">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page blog-page">
        <h1>MILES Blog</h1>
        <p className="blog-empty-state">{error}</p>
      </div>
    );
  }

  if (selectedBlog) {
    const isFlatLayout = selectedBlog.displayStyle === 'flat';
    const selectedCoverImage = resolveBlogImageSrc(selectedBlog.coverImage);
    const bodyContent = selectedBlog.authorBio
      ? (selectedBlog.content || '').split(/\n*About the Author\n*/i)[0].trimEnd()
      : selectedBlog.content;

    return (
      <div className="page blog-page">
        <button
          type="button"
          className="blog-back-btn"
          onClick={() => setSelectedBlogId('')}
        >
          &larr; Back to all posts
        </button>

        <article className="blog-detail-card">
          {selectedCoverImage && !isFlatLayout ? (
            <div className="blog-detail-hero">
              <div className="blog-detail-hero-portrait">
                <img
                  src={selectedCoverImage}
                  alt={selectedBlog.author || selectedBlog.title}
                />
              </div>
              <div className="blog-detail-hero-text">
                {selectedBlog.authorTitle ? (
                  <span className="blog-chairperson-ribbon">{selectedBlog.authorTitle}</span>
                ) : null}
                <h1>{selectedBlog.title}</h1>
                <p className="blog-detail-meta">
                  {selectedBlog.author ? <span>By {selectedBlog.author}</span> : null}
                  {selectedBlog.author && (selectedBlog.createdAt || selectedBlog.updatedAt) ? (
                    <span aria-hidden="true"> &middot; </span>
                  ) : null}
                  {selectedBlog.createdAt || selectedBlog.updatedAt ? (
                    <span>
                      {formatDisplayDate(selectedBlog.createdAt || selectedBlog.updatedAt)}
                    </span>
                  ) : null}
                </p>
                {selectedBlog.tags && selectedBlog.tags.length > 0 ? (
                  <div className="blog-tags">
                    {selectedBlog.tags.map((tag) => (
                      <span key={`${selectedBlog._id}-${tag}`} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <header className="blog-detail-header">
              {selectedCoverImage ? (
                <img
                  className="blog-detail-cover blog-detail-cover-flat"
                  src={selectedCoverImage}
                  alt={selectedBlog.author || selectedBlog.title}
                />
              ) : null}
              <h1>{selectedBlog.title}</h1>
              <p className="blog-detail-meta">
                {selectedBlog.author ? <span>By {selectedBlog.author}</span> : null}
                {selectedBlog.author && (selectedBlog.createdAt || selectedBlog.updatedAt) ? (
                  <span aria-hidden="true"> &middot; </span>
                ) : null}
                {selectedBlog.createdAt || selectedBlog.updatedAt ? (
                  <span>
                    {formatDisplayDate(selectedBlog.createdAt || selectedBlog.updatedAt)}
                  </span>
                ) : null}
              </p>

              {selectedBlog.tags && selectedBlog.tags.length > 0 ? (
                <div className="blog-tags">
                  {selectedBlog.tags.map((tag) => (
                    <span key={`${selectedBlog._id}-${tag}`} className="blog-tag">{tag}</span>
                  ))}
                </div>
              ) : null}
            </header>
          )}

          <div className="blog-detail-content">
            {renderParagraphs(bodyContent)}
          </div>

          {selectedBlog.authorBio ? (
            <aside className="blog-chairperson-card">
              <div className="blog-chairperson-frame">
                {selectedCoverImage ? (
                  <img src={selectedCoverImage} alt={selectedBlog.author} />
                ) : (
                  <span className="material-symbols-outlined">person</span>
                )}
              </div>
              <div className="blog-chairperson-body">
                <span className="blog-chairperson-eyebrow">
                  {selectedBlog.authorTitle || 'About the Author'}
                </span>
                <h3 className="blog-chairperson-name">{selectedBlog.author}</h3>
                <p className="blog-chairperson-bio">{selectedBlog.authorBio}</p>
              </div>
            </aside>
          ) : null}
        </article>
      </div>
    );
  }

  return (
    <div className="page blog-page">
      <h1>MILES Blog</h1>
      <p className="blog-page-intro">
        Stories, reflections, and updates from the MILES community in Kakuma.
      </p>

      <div className="blog-search-row">
        <input
          type="search"
          className="blog-search-input"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search blog posts by title, author or tag..."
          aria-label="Search blog posts"
        />
      </div>

      {filteredBlogs.length === 0 ? (
        <p className="blog-empty-state">
          {blogs.length === 0
            ? 'No blog posts have been published yet. Check back soon.'
            : 'No blog posts match your search.'}
        </p>
      ) : (
        <div className="blog-grid">
          {filteredBlogs.map((blog) => (
            <article key={blog._id} className="blog-card">
              {blog.coverImage ? (
                <img
                  className="blog-card-cover"
                  src={resolveBlogImageSrc(blog.coverImage)}
                  alt={blog.title}
                />
              ) : (
                <div className="blog-card-cover blog-card-cover-placeholder" aria-hidden="true">
                  <span className="material-symbols-outlined">article</span>
                </div>
              )}

              <div className="blog-card-body">
                <h2 className="blog-card-title">{blog.title}</h2>
                <p className="blog-card-meta">
                  {blog.author ? <span>By {blog.author}</span> : null}
                  {blog.author && (blog.createdAt || blog.updatedAt) ? (
                    <span aria-hidden="true"> &middot; </span>
                  ) : null}
                  {blog.createdAt || blog.updatedAt ? (
                    <span>{formatDisplayDate(blog.createdAt || blog.updatedAt)}</span>
                  ) : null}
                </p>
                <p className="blog-card-excerpt">
                  {blog.excerpt || (blog.content || '').slice(0, 180) + ((blog.content || '').length > 180 ? '...' : '')}
                </p>
                {blog.tags && blog.tags.length > 0 ? (
                  <div className="blog-tags">
                    {blog.tags.slice(0, 4).map((tag) => (
                      <span key={`${blog._id}-${tag}`} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                ) : null}

                <button
                  type="button"
                  className="blog-read-more"
                  onClick={() => setSelectedBlogId(blog._id)}
                >
                  Read more
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
