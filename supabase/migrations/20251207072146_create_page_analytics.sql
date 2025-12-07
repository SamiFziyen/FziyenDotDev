/*
  # Create page analytics table

  ## Overview
  Tracks total page views and today's views for the analytics dashboard.

  ## New Table
  - `page_analytics`
    - `id` (uuid, primary key)
    - `date` (date) - Date of the analytics
    - `total_views` (integer) - Cumulative total views
    - `today_views` (integer) - Views for the current day
    - `updated_at` (timestamptz)
*/

CREATE TABLE IF NOT EXISTS page_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE DEFAULT CURRENT_DATE,
  total_views integer DEFAULT 0,
  today_views integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_page_analytics_date ON page_analytics(date DESC);

ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view page analytics"
  ON page_analytics FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update page analytics"
  ON page_analytics FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert page analytics"
  ON page_analytics FOR INSERT
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION update_page_analytics_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_page_analytics_updated_at ON page_analytics;

CREATE TRIGGER update_page_analytics_updated_at
  BEFORE UPDATE ON page_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_page_analytics_updated_at();

INSERT INTO page_analytics (date, total_views, today_views)
VALUES (CURRENT_DATE, 0, 0)
ON CONFLICT (date) DO NOTHING;
