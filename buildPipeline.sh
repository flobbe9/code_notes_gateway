npm run prod &
sleep 5
NODE_PID=$(pgrep -f "prod")
echo $NODE_PID
if [ -z $NODE_PID ]; then
    echo "failed"
    exit 1;
else
    echo "success"
    exit 0;
fi;