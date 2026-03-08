import { useState, useEffect } from 'react';
import client from '../lib/contentfulClient';

export function useContentful(contentType, query = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    client
      .getEntries({ content_type: contentType, ...query })
      .then((response) => {
        if (!cancelled) {
          setData(response.items);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType]);

  return { data, loading, error };
}

export function useContentfulEntry(entryId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    client
      .getEntry(entryId)
      .then((entry) => {
        if (!cancelled) {
          setData(entry);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [entryId]);

  return { data, loading, error };
}
