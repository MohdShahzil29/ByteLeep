public class ReverseArray {
    public static void main(String[] args) {
        // Example arrays
        int[] arr1 = {1, 4, 3, 2, 6, 5};
        int[] arr2 = {8, 6, 5, 3, 5};

        // Reverse the arrays
        reverseArray(arr1);
        reverseArray(arr2);

        // Print the reversed arrays
        System.out.println("Reversed arr1:");
        printArray(arr1);

        System.out.println("Reversed arr2:");
        printArray(arr2);   
    }

    // Method to reverse an array
    public static void reverseArray(int[] arr) {
        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            // Swap the elements at left and right indices
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            // Move towards the center
            left++;
            right--;
        }
    }

    // Method to print an array
    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
