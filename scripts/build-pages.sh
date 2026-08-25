#!/usr/bin/env bash
set -euo pipefail

version="${1:-}"
if [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  printf 'Usage: %s VERSION\n' "$0" >&2
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
dist="$repo_root/dist"
temp_dir="$(mktemp -d)"
trap 'rm -rf "$temp_dir"' EXIT

copy_site() {
  local source="$1"
  local destination="$2"

  mkdir -p "$destination"
  cp -R "$source/css" "$source/js" "$destination/"
  cp "$source"/podcast-player-*.html "$destination/"
  cp "$source/podcast-player-configurator.html" "$destination/index.html"
}

mkdir -p "$dist"
rm -rf "$dist"/* "$dist"/.[!.]* "$dist"/..?*

current_source="$temp_dir/current"
mkdir -p "$current_source"
git archive --format=tar "v$version" | tar -x -C "$current_source"
copy_site "$current_source" "$dist"

mkdir -p "$dist/versions"
cat > "$dist/versions/index.html" <<'HTML'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Podcast Player versions</title>
</head>
<body>
  <main>
    <h1>Podcast Player versions</h1>
    <ul>
HTML

while IFS= read -r tag; do
  release_version="${tag#v}"
  [[ "$release_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || continue

  release_source="$temp_dir/$release_version"
  mkdir -p "$release_source"
  git archive --format=tar "$tag" | tar -x -C "$release_source"
  copy_site "$release_source" "$dist/versions/$release_version"
  printf '      <li><a href="./%s/">%s</a></li>\n' "$release_version" "$release_version" >> "$dist/versions/index.html"
done < <(git tag --list 'v*' --sort=-v:refname)

cat >> "$dist/versions/index.html" <<'HTML'
    </ul>
  </main>
</body>
</html>
HTML

: > "$dist/.nojekyll"
