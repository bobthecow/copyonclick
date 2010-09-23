file 'jquery.copyonclick.min.js' => ['ZeroClipboard.js', 'jquery.copyonclick.js'] do |t|
  gem 'jsmin'
  require 'jsmin'
  
  target = t.name
  unless uptodate?(target, t.prerequisites)
    new_js = []
    t.prerequisites.each do |script_name|
      src = IO.read(script_name)
      new_js.push(JSMin.minify(src).strip)
    end
    open(target, 'w') do |f|
      f.write(new_js.join("\n\n"))
    end
  end
end

desc 'Remove the minified javascript'
task :clean do
  if File.exist? 'jquery.copyonclick.min.js'
    rm 'jquery.copyonclick.min.js'
  end
end

desc 'Minify copyOnClick'
task :build => [:clean, 'jquery.copyonclick.min.js']

task :default => :build